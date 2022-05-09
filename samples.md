# CTR Samples

## Case1

```json
{"AWSAccountId":"123456789012","AWSContactTraceRecordFormatVersion":"2017-03-10","Agent":{"ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/agent/e7c9afb6-b1e1-4afa-b5b5-d1c9bc752b69","AfterContactWorkDuration":5,"AfterContactWorkEndTimestamp":"2022-01-05T17:28:17Z","AfterContactWorkStartTimestamp":"2022-01-05T17:28:12Z","AgentInteractionDuration":239,"ConnectedToAgentTimestamp":"2022-01-05T17:20:32Z","CustomerHoldDuration":221,"HierarchyGroups":{"Level1":{"ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/agent-group/bf0c4e88-50bd-4bb9-823c-8650c630cf87","GroupName":"TCC"},"Level2":{"ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/agent-group/647c7f7d-250b-426a-a0a3-1c1b5c43841d","GroupName":"TCC ALL"},"Level3":null,"Level4":null,"Level5":null},"LongestHoldDuration":204,"NumberOfHolds":2,"RoutingProfile":{"ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/routing-profile/304e0036-2322-45fd-80c4-c97e184c388b","Name":"TCC ALL"},"Username":"Steve.Lusk"},"AgentConnectionAttempts":1,"AnsweringMachineDetectionStatus":null,"Attributes":{"Acct_Code":"","AtcResult":"N","CodeNum":"0","PathCode":"8477597_002_00002","SurveyFlag":"N","SurveyPlay":"All","TodayContact":"Y","Type_Flag":"","ewtcheck":"Y"},"Campaign":{"CampaignId":null},"Channel":"VOICE","ConnectedToSystemTimestamp":"2022-01-05T17:12:59Z","ContactDetails":{},"ContactId":"6fe40d2a-1a89-4d73-bfcf-5d9c33894f47","CustomerEndpoint":{"Address":"+190011112222","Type":"TELEPHONE_NUMBER"},"DisconnectReason":"CUSTOMER_DISCONNECT","DisconnectTimestamp":"2022-01-05T17:47:28Z","InitialContactId":null,"InitiationMethod":"INBOUND","InitiationTimestamp":"2022-01-05T17:12:59Z","InstanceARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea","LastUpdateTimestamp":"2022-01-05T17:48:35Z","MediaStreams":[{"Type":"AUDIO"}],"NextContactId":null,"PreviousContactId":null,"Queue":{"ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/queue/078ccbaa-ae69-4bf9-84bc-5c60ca9b1478","DequeueTimestamp":"2022-01-05T17:20:32Z","Duration":346,"EnqueueTimestamp":"2022-01-05T17:14:46Z","Name":"TCC Refrig AC LLA"},"Recording":{"DeletionReason":null,"Location":"amazon-connect-b278e465e71c/connect/lgeai/CallRecordings/2022/01/05/6fe40d2a-1a89-4d73-bfcf-5d9c33894f47_20220105T17:20_UTC.wav","Status":"AVAILABLE","Type":"AUDIO"},"Recordings":[{"DeletionReason":null,"FragmentStartNumber":null,"FragmentStopNumber":null,"Location":"amazon-connect-b278e465e71c/connect/lgeai/CallRecordings/2022/01/05/6fe40d2a-1a89-4d73-bfcf-5d9c33894f47_20220105T17:20_UTC.wav","MediaStreamType":"AUDIO","ParticipantType":null,"StartTimestamp":null,"Status":"AVAILABLE","StopTimestamp":null,"StorageType":"S3"}],"References":[],"ScheduledTimestamp":null,"SystemEndpoint":{"Address":"+18003335555","Type":"TELEPHONE_NUMBER"},"TransferCompletedTimestamp":"2022-01-05T17:28:12Z","TransferredToEndpoint":{"Address":"+18002430000","Type":"TELEPHONE_NUMBER"},"VoiceIdResult":null}
```

## Case2 

```json
{"AWSAccountId":"123456789012","AWSContactTraceRecordFormatVersion":"2017-03-10","Agent":{"ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/agent/e7c9afb6-b1e1-4afa-b5b5-d1c9bc752b69","AfterContactWorkDuration":5,"AfterContactWorkEndTimestamp":"2022-01-05T17:28:17Z","AfterContactWorkStartTimestamp":"2022-01-05T17:28:12Z","AgentInteractionDuration":239,"ConnectedToAgentTimestamp":"2022-01-05T17:20:32Z","CustomerHoldDuration":221,"HierarchyGroups":{"Level1":{"ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/agent-group/bf0c4e88-50bd-4bb9-823c-8650c630cf87","GroupName":"TCC"},"Level2":{"ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/agent-group/647c7f7d-250b-426a-a0a3-1c1b5c43841d","GroupName":"TCC ALL"},"Level3":null,"Level4":null,"Level5":null},"LongestHoldDuration":204,"NumberOfHolds":2,"RoutingProfile":{"ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/routing-profile/304e0036-2322-45fd-80c4-c97e184c388b","Name":"TCC ALL"},"Username":"Steve.Lusk"},"AgentConnectionAttempts":1,"AnsweringMachineDetectionStatus":null,"Attributes":{"Acct_Code":"","AtcResult":"N","CodeNum":"0","PathCode":"8477597_002_00002","SurveyFlag":"N","SurveyPlay":"All","TodayContact":"Y","Type_Flag":"","ewtcheck":"Y","greetingPlayed":"false"},"Campaign":{"CampaignId":null},"Channel":"VOICE","ConnectedToSystemTimestamp":"2022-01-05T17:12:59Z","ContactDetails":{},"ContactId":"6fe40d2a-1a89-4d73-bfcf-5d9c33894f47","CustomerEndpoint":{"Address":"+190011112222","Type":"TELEPHONE_NUMBER"},"DisconnectReason":"CUSTOMER_DISCONNECT","DisconnectTimestamp":"2022-01-05T17:47:28Z","InitialContactId":null,"InitiationMethod":"INBOUND","InitiationTimestamp":"2022-01-05T17:12:59Z","InstanceARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea","LastUpdateTimestamp":"2022-01-11T03:41:32Z","MediaStreams":[{"Type":"AUDIO"}],"NextContactId":null,"PreviousContactId":null,"Queue":{"ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/queue/078ccbaa-ae69-4bf9-84bc-5c60ca9b1478","DequeueTimestamp":"2022-01-05T17:20:32Z","Duration":346,"EnqueueTimestamp":"2022-01-05T17:14:46Z","Name":"TCC Refrig AC LLA"},"Recording":{"DeletionReason":null,"Location":"amazon-connect-b278e465e71c/connect/lgeai/CallRecordings/2022/01/05/6fe40d2a-1a89-4d73-bfcf-5d9c33894f47_20220105T17:20_UTC.wav","Status":"AVAILABLE","Type":"AUDIO"},"Recordings":[{"DeletionReason":null,"FragmentStartNumber":null,"FragmentStopNumber":null,"Location":"amazon-connect-b278e465e71c/connect/lgeai/CallRecordings/2022/01/05/6fe40d2a-1a89-4d73-bfcf-5d9c33894f47_20220105T17:20_UTC.wav","MediaStreamType":"AUDIO","ParticipantType":null,"StartTimestamp":null,"Status":"AVAILABLE","StopTimestamp":null,"StorageType":"S3"}],"References":[],"ScheduledTimestamp":null,"SystemEndpoint":{"Address":"+18003335555","Type":"TELEPHONE_NUMBER"},"TransferCompletedTimestamp":"2022-01-05T17:28:12Z","TransferredToEndpoint":{"Address":"+18002430000","Type":"TELEPHONE_NUMBER"},"VoiceIdResult":null}
```



## Case3

```json
{"AWSAccountId":"123456789012","AWSContactTraceRecordFormatVersion":"2017-03-10","Agent":{"ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/agent/e7c9afb6-b1e1-4afa-b5b5-d1c9bc752b69","AfterContactWorkDuration":5,"AfterContactWorkEndTimestamp":"2022-01-05T17:28:17Z","AfterContactWorkStartTimestamp":"2022-01-05T17:28:12Z","AgentInteractionDuration":239,"ConnectedToAgentTimestamp":"2022-01-05T17:20:32Z","CustomerHoldDuration":221,"HierarchyGroups":{"Level1":{"ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/agent-group/bf0c4e88-50bd-4bb9-823c-8650c630cf87","GroupName":"TCC"},"Level2":{"ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/agent-group/647c7f7d-250b-426a-a0a3-1c1b5c43841d","GroupName":"TCC ALL"},"Level3":null,"Level4":null,"Level5":null},"LongestHoldDuration":204,"NumberOfHolds":2,"RoutingProfile":{"ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/routing-profile/304e0036-2322-45fd-80c4-c97e184c388b","Name":"TCC ALL"},"Username":"Steve.Lusk"},"AgentConnectionAttempts":1,"AnsweringMachineDetectionStatus":null,"Attributes":{"Acct_Code":"","AtcResult":"N","CodeNum":"0","GreetingPlayed":"false","PathCode":"8477597_002_00002","SurveyFlag":"N","SurveyPlay":"All","TodayContact":"Y","Type_Flag":"","ewtcheck":"Y","greetingPlayed":"false"},"Campaign":{"CampaignId":null},"Channel":"VOICE","ConnectedToSystemTimestamp":"2022-01-05T17:12:59Z","ContactDetails":{},"ContactId":"6fe40d2a-1a89-4d73-bfcf-5d9c33894f47","CustomerEndpoint":{"Address":"+190011112222","Type":"TELEPHONE_NUMBER"},"DisconnectReason":"CUSTOMER_DISCONNECT","DisconnectTimestamp":"2022-01-05T17:47:28Z","InitialContactId":null,"InitiationMethod":"INBOUND","InitiationTimestamp":"2022-01-05T17:12:59Z","InstanceARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea","LastUpdateTimestamp":"2022-01-11T04:09:47Z","MediaStreams":[{"Type":"AUDIO"}],"NextContactId":null,"PreviousContactId":null,"Queue":{"ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/queue/078ccbaa-ae69-4bf9-84bc-5c60ca9b1478","DequeueTimestamp":"2022-01-05T17:20:32Z","Duration":346,"EnqueueTimestamp":"2022-01-05T17:14:46Z","Name":"TCC Refrig AC LLA"},"Recording":{"DeletionReason":null,"Location":"amazon-connect-b278e465e71c/connect/lgeai/CallRecordings/2022/01/05/6fe40d2a-1a89-4d73-bfcf-5d9c33894f47_20220105T17:20_UTC.wav","Status":"AVAILABLE","Type":"AUDIO"},"Recordings":[{"DeletionReason":null,"FragmentStartNumber":null,"FragmentStopNumber":null,"Location":"amazon-connect-b278e465e71c/connect/lgeai/CallRecordings/2022/01/05/6fe40d2a-1a89-4d73-bfcf-5d9c33894f47_20220105T17:20_UTC.wav","MediaStreamType":"AUDIO","ParticipantType":null,"StartTimestamp":null,"Status":"AVAILABLE","StopTimestamp":null,"StorageType":"S3"}],"References":[],"ScheduledTimestamp":null,"SystemEndpoint":{"Address":"+18003335555","Type":"TELEPHONE_NUMBER"},"TransferCompletedTimestamp":"2022-01-05T17:28:12Z","TransferredToEndpoint":{"Address":"+18002430000","Type":"TELEPHONE_NUMBER"},"VoiceIdResult":null}
```


### CTR의 Json 포맷

아래는 Case1을 보기 쉽게 정리하였습니다. 

```json
{
    "AWSAccountId":"123456789012",
    "AWSContactTraceRecordFormatVersion":"2017-03-10",
    "Agent":{
        "ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/agent/e7c9afb6-b1e1-4afa-b5b5-d1c9bc752b69",
        "AfterContactWorkDuration":5,
        "AfterContactWorkEndTimestamp":"2022-01-05T17:28:17Z",
        "AfterContactWorkStartTimestamp":"2022-01-05T17:28:12Z",
        "AgentInteractionDuration":239,
        "ConnectedToAgentTimestamp":"2022-01-05T17:20:32Z",
        "CustomerHoldDuration":221,
        "HierarchyGroups":{
            "Level1":{
                "ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/agent-group/bf0c4e88-50bd-4bb9-823c-8650c630cf87",
                "GroupName":"TCC"
            },
            "Level2":{
                "ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/agent-group/647c7f7d-250b-426a-a0a3-1c1b5c43841d",
                "GroupName":"TCC ALL"
            },
            "Level3":null,
            "Level4":null,
            "Level5":null
        },
        "LongestHoldDuration":204,
        "NumberOfHolds":2,
        "RoutingProfile":{
            "ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/routing-profile/304e0036-2322-45fd-80c4-c97e184c388b",
            "Name":"TCC ALL"
        },
        "Username":"Steve.Lusk"
    },
    "AgentConnectionAttempts":1,
    "AnsweringMachineDetectionStatus":null,
    "Attributes":{
        "Acct_Code":"",
        "AtcResult":"N",
        "CodeNum":"0",
        "PathCode":"8477597_002_00002",
        "SurveyFlag":"N",
        "SurveyPlay":"All",
        "TodayContact":"Y",
        "Type_Flag":"",
        "ewtcheck":"Y"
    },
    "Campaign":{
        "CampaignId":null
    },
    "Channel":"VOICE",
    "ConnectedToSystemTimestamp":"2022-01-05T17:12:59Z",
    "ContactDetails":{},
    "ContactId":"6fe40d2a-1a89-4d73-bfcf-5d9c33894f47",
    "CustomerEndpoint":{
        "Address":"+190011112222",
        "Type":"TELEPHONE_NUMBER"
    },
    "DisconnectReason":"CUSTOMER_DISCONNECT",
    "DisconnectTimestamp":"2022-01-05T17:47:28Z",
    "InitialContactId":null,
    "InitiationMethod":"INBOUND",
    "InitiationTimestamp":"2022-01-05T17:12:59Z",
    "InstanceARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea",
    "LastUpdateTimestamp":"2022-01-05T17:48:35Z",
    "MediaStreams":[
        {"Type":"AUDIO"}
    ],
    "NextContactId":null,
    "PreviousContactId":null,
    "Queue":{
        "ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/queue/078ccbaa-ae69-4bf9-84bc-5c60ca9b1478",
        "DequeueTimestamp":"2022-01-05T17:20:32Z",
        "Duration":346,
        "EnqueueTimestamp":"2022-01-05T17:14:46Z",
        "Name":"TCC Refrig AC LLA"
    },
    "Recording":{
        "DeletionReason":null,
        "Location":"amazon-connect-b278e465e71c/connect/lgeai/CallRecordings/2022/01/05/6fe40d2a-1a89-4d73-bfcf-5d9c33894f47_20220105T17:20_UTC.wav",
        "Status":"AVAILABLE",
        "Type":"AUDIO"
    },
    "Recordings":[
        {
            "DeletionReason":null,
            "FragmentStartNumber":null,
            "FragmentStopNumber":null,
            "Location":"amazon-connect-b278e465e71c/connect/lgeai/CallRecordings/2022/01/05/6fe40d2a-1a89-4d73-bfcf-5d9c33894f47_20220105T17:20_UTC.wav",
            "MediaStreamType":"AUDIO",
            "ParticipantType":null,
            "StartTimestamp":null,
            "Status":"AVAILABLE",
            "StopTimestamp":null,
            "StorageType":"S3"
        }],
    "References":[],
    "ScheduledTimestamp":null,
    "SystemEndpoint":{
        "Address":"+18003335555",
        "Type":"TELEPHONE_NUMBER"
    },
    "TransferCompletedTimestamp":"2022-01-05T17:28:12Z",
    "TransferredToEndpoint":{
        "Address":"+18004449999",
        "Type":"TELEPHONE_NUMBER"
    },
    "VoiceIdResult":null
}
```

```java
{
   "AWSAccountId":"123456789012",
   "AWSContactTraceRecordFormatVersion":"2017-03-10",
   "Agent":{
      "ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/agent/e7c9afb6-b1e1-4afa-b5b5-d1c9bc752b69",
      "AfterContactWorkDuration":5,
      "AfterContactWorkEndTimestamp":"2022-01-05T17:28:17Z",
      "AfterContactWorkStartTimestamp":"2022-01-05T17:28:12Z",
      "AgentInteractionDuration":239,
      "ConnectedToAgentTimestamp":"2022-01-05T17:20:32Z",
      "CustomerHoldDuration":221,
      "HierarchyGroups":{
         "Level1":{
            "ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/agent-group/bf0c4e88-50bd-4bb9-823c-8650c630cf87",
            "GroupName":"TCC"
         },
         "Level2":{
            "ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/agent-group/647c7f7d-250b-426a-a0a3-1c1b5c43841d",
            "GroupName":"TCC ALL"
         },
         "Level3":null,
         "Level4":null,
         "Level5":null
      },
      "LongestHoldDuration":204,
      "NumberOfHolds":2,
      "RoutingProfile":{
         "ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/routing-profile/304e0036-2322-45fd-80c4-c97e184c388b",
         "Name":"TCC ALL"
      },
      "Username":"Steve.Lusk"
   },
   "AgentConnectionAttempts":1,
   "AnsweringMachineDetectionStatus":null,
   "Attributes":{
      "Acct_Code":"",
      "AtcResult":"N",
      "CodeNum":"0",
      "PathCode":"8477597_002_00002",
      "SurveyFlag":"N",
      "SurveyPlay":"All",
      "TodayContact":"Y",
      "Type_Flag":"",
      "ewtcheck":"Y"
   },
   "Campaign":{
      "CampaignId":null
   },
   "Channel":"VOICE",
   "ConnectedToSystemTimestamp":"2022-01-05T17:12:59Z",
   "ContactDetails":{
      
   },
   "ContactId":"6fe40d2a-1a89-4d73-bfcf-5d9c33894f47",
   "CustomerEndpoint":{
      "Address":"+190011112222",
      "Type":"TELEPHONE_NUMBER"
   },
   "DisconnectReason":"CUSTOMER_DISCONNECT",
   "DisconnectTimestamp":"2022-01-05T17:47:28Z",
   "InitialContactId":null,
   "InitiationMethod":"INBOUND",
   "InitiationTimestamp":"2022-01-05T17:12:59Z",
   "InstanceARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea",
   "LastUpdateTimestamp":"2022-01-05T17:48:35Z",
   "MediaStreams":[
      {
         "Type":"AUDIO"
      }
   ],
   "NextContactId":null,
   "PreviousContactId":null,
   "Queue":{
      "ARN":"arn:aws:connect:us-east-1:123456789012:instance/258252ea-967d-46f9-a510-b7f0bae69eea/queue/078ccbaa-ae69-4bf9-84bc-5c60ca9b1478",
      "DequeueTimestamp":"2022-01-05T17:20:32Z",
      "Duration":346,
      "EnqueueTimestamp":"2022-01-05T17:14:46Z",
      "Name":"TCC Refrig AC LLA"
   },
   "Recording":{
      "DeletionReason":null,
      "Location":"amazon-connect-b278e465e71c/connect/lgeai/CallRecordings/2022/01/05/6fe40d2a-1a89-4d73-bfcf-5d9c33894f47_20220105T17:20_UTC.wav",
      "Status":"AVAILABLE",
      "Type":"AUDIO"
   },
   "Recordings":[
      {
         "DeletionReason":null,
         "FragmentStartNumber":null,
         "FragmentStopNumber":null,
         "Location":"amazon-connect-b278e465e71c/connect/lgeai/CallRecordings/2022/01/05/6fe40d2a-1a89-4d73-bfcf-5d9c33894f47_20220105T17:20_UTC.wav",
         "MediaStreamType":"AUDIO",
         "ParticipantType":null,
         "StartTimestamp":null,
         "Status":"AVAILABLE",
         "StopTimestamp":null,
         "StorageType":"S3"
      }
   ],
   "References":[
      
   ],
   "ScheduledTimestamp":null,
   "SystemEndpoint":{
      "Address":"+18003335555",
      "Type":"TELEPHONE_NUMBER"
   },
   "TransferCompletedTimestamp":"2022-01-05T17:28:12Z",
   "TransferredToEndpoint":{
      "Address":"+18002430000",
      "Type":"TELEPHONE_NUMBER"
   },
   "VoiceIdResult":null
}
```
    "VoiceIdResult":null
