const aws = require('aws-sdk');
const kinesis = new aws.Kinesis();

const md5 = require('md5');

const streamName = process.env.streamName;

exports.handler = async (event) => {
    console.log('## ENVIRONMENT VARIABLES: ' + JSON.stringify(process.env))
    console.log('## EVENT: ' + JSON.stringify(event))
    
    let partitionKeys = [];
    for(let i=0;i<event.length;i++) {
        const body = JSON.stringify(event[i]);    
        console.log('body: %j', body);

        let pk = md5(body);  // hashing
        console.log('pk: '+pk);
        partitionKeys.push(pk);

        const kinesisParams = {
            Data: body,
            PartitionKey: pk,
            StreamName: streamName
        } 
        try {
            let kinesisResponse = await kinesis.putRecord(kinesisParams).promise();
            console.log("kinesisResponse: "+JSON.stringify(kinesisResponse));
        } catch(err) {
            console.log(err);
        } 
    }

    // response    
    const response = {
        statusCode: 200,
        body: JSON.stringify(partitionKeys),
    };
    return response;
};