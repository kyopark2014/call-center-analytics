import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as kinesisstream from 'aws-cdk-lib/aws-kinesis';
import * as kinesisfirehose from 'aws-cdk-lib/aws-kinesisfirehose';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambdaEventSources from 'aws-cdk-lib/aws-lambda-event-sources';
import * as glue from 'aws-cdk-lib/aws-glue'
import * as athena from 'aws-cdk-lib/aws-athena'

export class CdkConnectStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // S3
    const s3Bucket = new s3.Bucket(this, "cdk-businfo",{
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      publicReadAccess: false,
      versioned: false,
    });
    new cdk.CfnOutput(this, 'bucketName', {
      value: s3Bucket.bucketName,
      description: 'The nmae of bucket',
    });
    new cdk.CfnOutput(this, 's3Arn', {
      value: s3Bucket.bucketArn,
      description: 'The arn of s3',
    });
    new cdk.CfnOutput(this, 's3Path', {
      value: 's3://'+s3Bucket.bucketName,
      description: 'The path of s3',
    });

    // kinesis data stream
    const stream = new kinesisstream.Stream(this, 'Stream', {
      streamName: 'businfo',
      retentionPeriod: cdk.Duration.hours(48),
      streamMode: kinesisstream.StreamMode.ON_DEMAND
    });
    new cdk.CfnOutput(this, 'StreamARN', {
      value: stream.streamArn,
      description: 'The arn of kinesis stream',
    });

    // using pre-defined metric method
    stream.metricGetRecordsSuccess();
    stream.metricPutRecordSuccess();

    // DynamoDB
    const tableName = 'dynamodb-duplication-checker';
    const dataTable = new dynamodb.Table(this, 'dynamodb-duplication-checker', {
        tableName: tableName,
        partitionKey: { name: 'RouteId', type: dynamodb.AttributeType.STRING },
        sortKey: { name: 'Timestamp', type: dynamodb.AttributeType.STRING },
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        //timeToLiveAttribute: 'ttl',ß
        kinesisStream: stream,
    });

    // Lambda - kinesisInfo
    const lambdakinesis = new lambda.Function(this, "LambdaKinesisStream", {
      description: 'get eventinfo from kinesis data stream',
      runtime: lambda.Runtime.NODEJS_14_X, 
      code: lambda.Code.fromAsset("repositories/lambda-kinesis-stream"), 
      handler: "index.handler", 
      timeout: cdk.Duration.seconds(3),
      environment: {
      }
    }); 

    // Lambda - kinesisInfo
    const lambdaDuplicationChecker = new lambda.Function(this, "LambdaDuplicationChecker", {
      description: 'check CTR dplications',
      runtime: lambda.Runtime.NODEJS_14_X, 
      code: lambda.Code.fromAsset("../lambda-duplication-checker"), 
      handler: "index.handler", 
      timeout: cdk.Duration.seconds(10),
      environment: {
        tableName: tableName,
      }
    }); 
    new cdk.CfnOutput(this, 'LambdaDuplicationCheckerARN', {
      value: lambdaDuplicationChecker.functionArn,
      description: 'The arn of lambda for duplication checker',
    });
    dataTable.grantReadWriteData(lambdaDuplicationChecker);

    // connect lambda for kinesis with kinesis data stream
    const eventSource = new lambdaEventSources.KinesisEventSource(stream, {
      startingPosition: lambda.StartingPosition.TRIM_HORIZON,
    });
    lambdaDuplicationChecker.addEventSource(eventSource);    

    // Lambda - Emulator for CTRs
    const lambdaEmulator = new lambda.Function(this, "LambdaEmulator", {
      description: 'Lambda for businfo',
      runtime: lambda.Runtime.NODEJS_14_X, 
      code: lambda.Code.fromAsset("../lambda-emulator"), 
      handler: "index.handler", 
      timeout: cdk.Duration.seconds(3),
      environment: {
      }
    });  

    // generate a table by crawler 
    const crawlerRole = new iam.Role(this, "crawlerRole", {
      assumedBy: new iam.AnyPrincipal(),
      description: "Role for parquet translation",
    });
    crawlerRole.addManagedPolicy({
      managedPolicyArn: 'arn:aws:iam::aws:policy/service-role/AWSGlueServiceRole',
    });  
    crawlerRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        "s3:AbortMultipartUpload",
        "s3:GetBucketLocation",
        "s3:GetObject",
        "s3:ListBucket",
        "s3:ListBucketMultipartUploads",
        "s3:PutObject"
      ],
      resources: [
        s3Bucket.bucketArn,
        s3Bucket.bucketArn + "/*"
      ],
    }));
    new cdk.CfnOutput(this, 'crawlerRoleArn', {
      value: crawlerRole.roleArn,
      description: 'The arn of crawlerRole',
    });
    
    // crawler 
    const glueDatabaseName = "inspector";
    const crawler = new glue.CfnCrawler(this, "TranslateToParquetGlueCrawler", {
      name: "translate-parquet-crawler",
      role: crawlerRole.roleArn,
      targets: {
          s3Targets: [
              {path: 's3://'+s3Bucket.bucketName+'/businfo'}, 
          ]
      },
      databaseName: glueDatabaseName,
      schemaChangePolicy: {
          deleteBehavior: 'DELETE_FROM_DATABASE'
      },      
    });

    // Traslation Role
    const translationRole = new iam.Role(this, 'TranslationRole', {
      assumedBy: new iam.AnyPrincipal(),
      description: 'TraslationRole',
    });
    translationRole.addManagedPolicy({
      managedPolicyArn: 'arn:aws:iam::aws:policy/AWSLambdaExecute',
    });  
    translationRole.addManagedPolicy({
      managedPolicyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaKinesisExecutionRole',
    });
    translationRole.addManagedPolicy({
      managedPolicyArn: 'arn:aws:iam::aws:policy/service-role/AWSGlueServiceRole',
    });
    translationRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        "s3:AbortMultipartUpload",
        "s3:GetBucketLocation",
        "s3:GetObject",
        "s3:ListBucket",
        "s3:ListBucketMultipartUploads",
        "s3:PutObject"
      ],
      resources: [
        s3Bucket.bucketArn,
        s3Bucket.bucketArn + "/*"
      ],
    }));
    translationRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        "lambda:InvokeFunction", 
        "lambda:GetFunctionConfiguration", 
      ],
      resources: [
        lambdaDuplicationChecker.functionArn, 
        lambdaDuplicationChecker.functionArn+':*'],
    }));
    translationRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        "glue:GetTable",
        "glue:GetTableVersion",
        "glue:GetTableVersions"
      ],
      resources: ['*'],
    }));

    const firehose = new kinesisfirehose.CfnDeliveryStream(this, 'FirehoseDeliveryStream', {
      deliveryStreamType: 'KinesisStreamAsSource',
      kinesisStreamSourceConfiguration: {
        kinesisStreamArn: stream.streamArn,
        roleArn: translationRole.roleArn,
      },      
      extendedS3DestinationConfiguration: {
        bucketArn: s3Bucket.bucketArn,
        bufferingHints: {
          intervalInSeconds: 60,
          sizeInMBs: 128    // mininum 64MBs at data format conversion 
        },
        compressionFormat: 'UNCOMPRESSED', // GZIP, SNAPPY
        encryptionConfiguration: {
          noEncryptionConfig: "NoEncryption"
        },
        prefix: "businfo/",
        errorOutputPrefix: 'eror/',
        roleArn: translationRole.roleArn,
        processingConfiguration: {
          enabled: true,
          processors: [{
            type: 'Lambda',
              parameters: [{
              parameterName: 'LambdaArn',
              parameterValue: lambdaDuplicationChecker.functionArn
            }]
          }]
        }, 
        dataFormatConversionConfiguration: {          
          enabled: false, 
          schemaConfiguration: {
            databaseName: glueDatabaseName, // Target Glue database name
            roleArn: translationRole.roleArn,
            tableName: 'businfo' // Target Glue table name
          }, 
        }, 
      }
    });      

    // athena workgroup
    new athena.CfnWorkGroup(this, 'analytics-athena-workgroup', {
      name: `businfo-workgroup`,
      workGroupConfiguration: {
        resultConfiguration: {
          outputLocation: `s3://${s3Bucket.bucketName}`,
        },
      },
    })
  }
}
