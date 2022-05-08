# Call Center Analytics

AI/ML 기술의 발전으로 Call Center의 지능화가 진행되고 있습니다. [Amazon Connect](https://aws.amazon.com/connect/?nc1=h_ls)는 Call Center에 필요한 각종 솔루션을 제공하고 있습니다. 아래는 AWS Connect로 구성한 Call Center의 대표적인 예시입니다. 

<img width="817" alt="image" src="https://user-images.githubusercontent.com/52392004/167278368-323f2898-48bb-4266-9748-fd4a3dad3594.png">


여기에서 CTR 수집과 관련된 부분을 좀더 상세하게 그리면 아래와 같습니다. 

<img width="741" alt="image" src="https://user-images.githubusercontent.com/52392004/167281094-3fb91afe-4052-499d-9d9f-3ed831ef6d4a.png">



Amazon Connect에서 수집된 상담내역(Customer Trace Record)에는 일일 통화건수 등 비지니스를 위한 매우 중요한 통계정보를 가지고 있으므로 중복이 있으면 제거 후 사용하여야 합니다. 중복은 S3에 저장된 데이터를 순차적으로 읽어서 처리하는 방법도 가능하겠으나, 중복된 CTR이 S3에 저장되기 전에 Amazon Kinesis Data Firhose에서 Lambda를 통해 미리 제거한다면, 불필요한 프로세싱 없이 Call Center의 CTR 데이터로 필요한 Business 통계를 효과적으로 처리할 수 있습니다. 아래 그림은 중복처리를 위한 로직을 검증하기 위한 Architecture입니다. Amazon Connect를 붙이지 않고, Lambda로 된 Emulator를 사용하고, [CTR Samples](https://github.com/kyopark2014/call-center-analytics/blob/main/samples.md)을 이용해 검증합니다.


<img width="638" alt="image" src="https://user-images.githubusercontent.com/52392004/166454943-c260be65-04a1-4998-a2b4-35f663d5c3c4.png">

CTR을 처리하기 위한 동작 시나리오는 아래와 같습니다. 

1) 고객(Customer)가 Call Center로 전화를 하고, 상담원(Agent)와 연결되면, 통화이력, 상담내용 등에 대한 Customer Trace Record (CTR)이 생성됩니다. 

2) 생성된 CTR들은 Amazon Kinesis Data Stream을 통해 수집되고, Kinesis Data Firehose와 Glue Data Catalog를 통해 Parquet와 같은 파일로 변환 후 S3에 저장됩니다.

3) CTR 데이터의 중복은 들어온 Record를 Hash하여 과거 이력을 DynamoDB 조회를 통해 확인합니다.

4) 중복없이 Amazon S3에 저장된 CTR들은 Amazon Athena로 분석될 수 있습니다. 


여기서는 [Amazon CDK](https://github.com/kyopark2014/technical-summary/blob/main/cdk-introduction.md)를 이용해 Infrastructure를 구성하고, Amazon CloudWatch를 통해, 인프라 상황에 대한 상세한 정보를 열람할 수 있습니다. 


## Hashing

```java
        console.log('start hashing');
        let fingerprint = "";
        try {
            const hashSum = crypto.createHash('sha256');    
            hashSum.update(body);      
            fingerprint = hashSum.digest('hex');
            
            console.log('finish hashing: fingerprint = '+fingerprint);
        } catch(error) {
            console.log(error);
        }
```        
