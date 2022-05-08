# Call Center Analytics

AI/ML 기술의 발전으로 Call Center의 지능화가 진행되고 있습니다. [Amazon Connect](https://aws.amazon.com/connect/?nc1=h_ls)는 Call Center에 필요한 각종 솔루션을 제공하고 있습니다. 아래는 AWS Connect로 구성한 Call Center의 대표적인 예시입니다. 

<img width="817" alt="image" src="https://user-images.githubusercontent.com/52392004/167278368-323f2898-48bb-4266-9748-fd4a3dad3594.png">


여기에서 CTR 수집과 관련된 부분을 좀더 상세하게 그리면 아래와 같습니다. 

<img width="741" alt="image" src="https://user-images.githubusercontent.com/52392004/167281094-3fb91afe-4052-499d-9d9f-3ed831ef6d4a.png">



Amazon Connect에서 수집된 상담내역(Customer Trace Record)에는 일일 통화건수 등 비지니스를 위한 매우 중요한 통계정보를 가지고 있으므로 중복이 있으면 제거 후 사용하여야 합니다. 중복은 S3에 저장된 데이터를 순차적으로 읽어서 처리하는 방법도 가능하겠으나, 중복된 CTR이 S3에 저장되기 전에 Amazon Kinesis Data Firhose에서 Lambda를 통해 미리 제거한다면, 불필요한 프로세싱 없이 Call Center의 CTR 데이터로 필요한 Business 통계를 효과적으로 처리할 수 있습니다. 아래 그림은 중복처리를 위한 로직을 검증하기 위한 Architecture입니다. Amazon Connect를 붙이지 않고, Lambda로 된 Emulator를 사용하고, [CTR Samples](https://github.com/kyopark2014/call-center-analytics/blob/main/samples.md)을 이용해 검증합니다.


<img width="707" alt="image" src="https://user-images.githubusercontent.com/52392004/167281443-23ba147f-73cb-48f3-b94e-161bfe0b4167.png">


CTR 중복을 확인하기 위한 동작 시나리오는 아래와 같습니다. 

1) Lambda Emulator에 Customer Trace Record (CTR) Sample을 event로 입력합니다. 

2) 입력된 CTR은 PutRecord을 이용해 Lambda Emulator이 Amazon Kinesis Data Stream에 CTR stream으로 입력합니다. 

3) Kinesis Data Stream에 수집된 데이터는 Lambda for duplication chacker에 의해 중복을 확인합니다. 

4) 중복되지 않은 경우에 hash 정보를 DynamoDB에 저장합니다.

5) DynamoDB에 저장된 hash된 CTR 정보는 일정시간이 지나면 TTL에 의해 삭제 됩니다. 

6) 중복없는 CTR 들은 Amazon S3에 저장되고, Glue와 Athena로 조회 할 수 있습니다. 
  

여기서는 [Amazon CDK](https://github.com/kyopark2014/technical-summary/blob/main/cdk-introduction.md)를 이용해 Infrastructure를 구성하고, Amazon CloudWatch를 통해, 인프라 상황에 대한 상세한 정보를 열람할 수 있습니다. 

## 중복된 CTR Samples

[중복된 CTRs](https://github.com/kyopark2014/call-center-analytics/blob/main/deplicated_CTRs.json)에는 6개의 CTR들이 있는데, 3개의 CTR이 2번씩 중복된 케이스입니다. 

## Hashing

"SHA256"으로 hashing하는 예제입니다.

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

6개의 CTR Sample에 대해 "SHA256"으로 hashing 할 경우에, 아래와 같이 중복된 CTR을 구분 할 수 있습니다.


## 인프라 생성 및 삭제 

1) AWS CDK 사용시

[AWS CDK](https://github.com/kyopark2014/technical-summary/blob/main/cdk-introduction.md)를 이용하여 인프라를 생성할 수 있습니다. 상세한 내용은 [AWS CDK로 Data Ingestion](https://github.com/kyopark2014/data-inggestion-using-kinesis/blob/main/cdk/README.md)을 참고하시기 바랍니다.

**인프라 생성 명령어**

```c
$ cdk bootstrap aws://[account number]/ap-northeast-2
$ cdk synth
$ cdk deploy
```

AWK CDK로 deploy하면 lambda for businfo가 schedule에 따라 자동으로 실행되어서 버스 도착정보를 수집합니다. 아직 parquet로 포맷 변경하는 옵션을 enable하지 않았으므로, 수집된 데이터는 Amazon S3의 bucket에 아래와 같이 확장자가 없이 json 포맷으로 저장됩니다. 

![image](https://user-images.githubusercontent.com/52392004/164419273-428851f2-15c6-4c64-ab4d-95dcc9a0c434.png)

json 파일이 수집된 후에 [Table 생성(Crawler)](https://github.com/kyopark2014/data-analytics-for-businfo/blob/main/run-crawler.md)을 참조하여 crawler를 run하여 변환을 위한 table을 생성합니다.  

table이 생성되면, parquet 포맷으로 변경하기 위해서 [Deploy 추가 사항](https://github.com/kyopark2014/data-analytics-for-businfo/blob/main/enable-format-translation.md)을 참조하여 parquet로 변환을 시작합니다. 

**인프라 삭제 명령어**

```c
$ cdk destroy
```

2) Console에서 생성시 

AWS CDK 사용이 익숙하지 않은 경우에 Console에서도 인프라 생성이 가능합니다. [Console 에서 인프라 생성](https://github.com/kyopark2014/data-analytics-for-businfo/blob/main/console/Readme.md)을 참고하시기 바랍니다.


## 시험 방법

1) 중복된 CTR samples을 복사합니다. 

[CTR samples](https://github.com/kyopark2014/call-center-analytics/blob/main/deplicated_CTRs.json)에 있는 json 파일을 복사합니다.

2) Lambda Console에서 Lambda로 검색합니다. 

아래와 같이 이름으로 lambda for emulator, lambda for duplication cheker를 찾을 수 있습니다.

https://ap-northeast-2.console.aws.amazon.com/lambda/home?region=ap-northeast-2#/functions

![noname](https://user-images.githubusercontent.com/52392004/167285455-714900d5-07a5-4d86-9eed-4abd5683de41.png)


3) 아래와 같이 lambda for emulator의 [Test]로 들어가서 [Event name]으로 "duplicated_CTRs"로 입력후, [Event JSON]에 [CTR samples](https://github.com/kyopark2014/call-center-analytics/blob/main/deplicated_CTRs.json)을 붙여 넣기 합니다. 이후 [Save]후에 [Test]를 선택 합니다.

4) CloudWatch에서 lambda for duplication checker의 로그를 확인 합니다. 

아래와 같이 6개의 CTR은 2개씩 중복임을 hash된 결과로 확인 할 수 있습니다. 

```java
2022-05-08T08:01:17.627Z	f87d92eb-dc36-49f5-addb-d5c5c883170f	INFO	finish hashing: fingerprint = 886176cd231d8c6a7ef5520cb60eace2d9826cb6a98031cee5fbdf8683334e58

2022-05-08T08:01:17.627Z	f87d92eb-dc36-49f5-addb-d5c5c883170f	INFO	finish hashing: fingerprint = 886176cd231d8c6a7ef5520cb60eace2d9826cb6a98031cee5fbdf8683334e58

2022-05-08T08:01:17.629Z	c62faad6-0c64-4098-b18f-49d20e10a1c4	INFO	finish hashing: fingerprint = ef7d9f7e4b26f827d2e526c4797852d978e6e9e2ccfdcaf162e9126a4eaca6a7

2022-05-08T08:01:17.630Z	c62faad6-0c64-4098-b18f-49d20e10a1c4	INFO	finish hashing: fingerprint = ef7d9f7e4b26f827d2e526c4797852d978e6e9e2ccfdcaf162e9126a4eaca6a7

2022-05-08T08:01:17.797Z	6827543a-7ad2-47fb-be9f-24c32d77d728	INFO	finish hashing: fingerprint = eaa1aa065a550dd3df0c912b1e9180100d7fa5dc9ffb378253721c68d4234b1d

2022-05-08T08:01:17.797Z	6827543a-7ad2-47fb-be9f-24c32d77d728	INFO	finish hashing: fingerprint = eaa1aa065a550dd3df0c912b1e9180100d7fa5dc9ffb378253721c68d4234b1d
```

