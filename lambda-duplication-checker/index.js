var crypto = require('crypto');

exports.handler = async (event) => {
    console.log('event: '+JSON.stringify((event)));
    
    let records = event['records'];
    let outRecords = [];

    for(let i=0;i<records.length;i++) {
        let record = records[i];

        let recordId = record['recordId'];
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
        
        // let binary = Buffer.from(JSON.stringify(converted), 'utf8').toString('base64');
        
        const outRecord = {
            recordId: recordId,
            result: 'Ok',
            data: data
        }
        outRecords.push(outRecord); 
    }
    console.log('body: %j', {'records': outRecords});
    
    return {'records': outRecords}
};
