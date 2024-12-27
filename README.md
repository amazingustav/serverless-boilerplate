<h1 align="center">
  Serverless Boilerplate
</h1>

## 🎯 Project features

### Tech Stack

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file
- [serverless-prune-plugin](https://github.com/claygregory/serverless-prune-plugin) - prunes old lambda versions.
- [serverless-plugin-aws-alerts](https://github.com/ACloudGuru/serverless-plugin-aws-alerts) - creates alerts automatically in CloudWatch.
- [serverless-plugin-canary-deployments](https://github.com/davidgf/serverless-plugin-canary-deployments) - implement canary deployments of Lambda functions with AWS CodeDeploy.

## 🔥 How to use the template

1. Create a new repo using this template
2. Clone your new project
3. Replace the standard names on the template (`ctrl + shift + f` in VSCode):
   1. `serverless-boilerplate` to your `<NewServiceName>`;
   3. `myFunction` to your `<newFunctionName>`.
4. Replace folder `myFunction` to your `<newFunctionName>`.

## 🛝 How to run

First, make sure you have installed [Node.js](https://nodejs.org/en/download/) (Node 16.17.0 or later) and the classic [Yarn](https://classic.yarnpkg.com/lang/en/) dependency.

Clone the project, then install the dependencies:

```bash
yarn bootstrap
```
