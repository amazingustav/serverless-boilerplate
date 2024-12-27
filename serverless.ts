import type { AWS } from "@serverless/typescript";

import * as Functions from "@functions/index";

const awsRegion = "us-east-1";
const awsAccount = "xxxxxxx";

const serverlessConfiguration: AWS = {
  service: "serverless-boilerplate",
  frameworkVersion: "3",
  useDotenv: true,
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-stage-manager",
    "serverless-prune-plugin",
    "serverless-plugin-aws-alerts",
    "serverless-iam-roles-per-function",
    "serverless-domain-manager",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: ['${opt:stage}-gateway-my-project-api-key'],
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  functions: Functions,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    // # Name of environments
    stages: ["staging", "production"],
    stage: "${opt:stage, 'staging'}",
    staging: {
      slackAlarmTopicWithArn: `arn:aws:sns:${awsRegion}:${awsAccount}:TOPIC_NAME`,
      cognitoAuthorizer: `arn:aws:cognito-idp:${awsRegion}:${awsAccount}:AUTHORIZER_NAME`,
    },
    production: {
      slackAlarmTopicWithArn:`arn:aws:sns:${awsRegion}:${awsAccount}:TOPIC_NAME`,
      cognitoAuthorizer: `arn:aws:cognito-idp:${awsRegion}:${awsAccount}:AUTHORIZER_NAME`,
    },
    domains: {
      production: "serverless-boilerplate.amz.com",
      staging: "serverless-boilerplate.staging.amz.com",
    },
    customDomain: {
      enabled: true,
      domainName: "${self:custom.domains.${self:custom.stage}}",
      basePath: "",
      stage: "${self:custom.stage}",
      createRoute53Record: false,
      autoDomain: true,
    },
    prune: {
      automatic: true,
      number: 3,
    },
    // # Default dash creation -- dashboards
    // # Creation of alarms for the level of error in the functions --alarms
    alerts: {
      topics: {
        critical: {
          alarm: {
            topic: "${self:custom.${self:custom.stage}.slackAlarmTopicWithArn}",
          },
        },
      },
      dashboards: false,
      definitions: {
        "5XXErrors": {
          name: "5XXErrors",
          namespace: "AWS/ApiGateway",
          metric: "5XXError",
          omitDefaultDimension: true,
          dimensions: [
            {
              Name: 'ApiName',
              Value: '${self:custom.${self:custom.stage}}',
            },
            {
              Name: 'Stage',
              Value: '${self:custom.stage}',
            },
          ],
          threshold: 5,
          statistic: "Sum",
          period: 60,
          evaluationPeriods: 1,
          datapointsToAlarm: 1,
          comparisonOperator: "GreaterThanOrEqualToThreshold",
          pattern: "{ $.statusCode = 500 }",
          alarmActions: ["critical"],
        },
      },
      alarms: ["functionThrottles", "functionErrors", "5XXErrors"],
    },
  },
};

module.exports = serverlessConfiguration;
