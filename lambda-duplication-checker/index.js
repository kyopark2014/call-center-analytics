const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();
const tableName = process.env.tableName;
const indexName = process.env.indexName;
var crypto = require('crypto');

exports.handler = async (event) => {
    console.log('event: '+JSON.stringify((event)));
    
    //let records = event['Records'];
    let records = event['records'];
    let outRecords = [];

    for(let i=0;i<records.length;i++) {
        let record = records[i];

        // let recordId = record['eventID'];
        let recordId = record['recordId'];
        console.log('recordId: '+recordId);

        // let data = Buffer.from(record['kinesis']['data'], 'base64');
        let data = Buffer.from(record['data'], 'base64');
        console.log('data: '+data);

        // hashing 
        console.log('start hashing');
        let fingerprint = "";
        try {
            const hashSum = crypto.createHash('sha256');    
            hashSum.update(data);      
            fingerprint = hashSum.digest('hex');
            
            console.log('finish hashing: fingerprint = '+fingerprint);
        } catch(error) {
            console.log(error);
        }

        // query dynamodb
        let count = 0;
        const queryParams = {
            TableName: tableName,
            IndexName: indexName,    
            KeyConditionExpression: "hashed_key = :hashed_key",
            ExpressionAttributeValues: {
                ":hashed_key": fingerprint
            },
        };    
        var dynamoQuery; 
        try {
            dynamoQuery = await dynamo.query(queryParams).promise();
    
            console.log('queryDynamo: '+JSON.stringify(dynamoQuery));
            console.log('queryDynamo: '+dynamoQuery.Count);   
            count = dynamoQuery.Count;
        } catch (error) {
          console.log(error);
          return;
        } 
            
        if(count == 0) {  
            console.log("Not duplicated!");

            // putItem to DynamoDB
            var putParams = {
                TableName: tableName,
                Item: {
                    "record_id": recordId,
                    "hashed_key": fingerprint,
                } 
            };
            console.log("params: %j", putParams);

            try {
                const response = await dynamo.put(putParams).promise();
                console.log('dynamo response: %j', response);
            } catch (error) {
                console.log(error);
            } 

            // let binary = Buffer.from(JSON.stringify(data), 'utf8').toString('base64');
            let binary = record['data'];
            const outRecord = {
                recordId: recordId,
                result: 'Ok',
                data: binary
            };
            outRecords.push(outRecord); 
        }
        else {
            console.log("Deplicated!!!, count: "+count);

            const outRecord = {
                recordId: recordId,
                result: 'Dropped',
                data: ""
            };
            outRecords.push(outRecord); 
        }        
    }
    console.log('body: %j', {'records': outRecords});
    
    return {'records': outRecords};
};
