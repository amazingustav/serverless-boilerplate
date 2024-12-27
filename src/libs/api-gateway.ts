import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export const formatJSONResponse = (
  response: Record<string, unknown>,
  statusCode: number
) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(response),
  };
};

export const badRequest = (response?: Record<string, unknown>) => {
  return {
    statusCode: 400,
    body: response ? JSON.stringify(response) : '',
  };
};

export const notFound = (response?: Record<string, unknown>) => {
  return {
    statusCode: 404,
    body: response ? JSON.stringify(response) : '',
  };
};

export const ok = (response?: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: response ? JSON.stringify(response) : '',
  };
};

export const created = (response?: Record<string, unknown>) => {
  return {
    statusCode: 201,
    body: response ? JSON.stringify(response) : '',
  };
};

export const noContent = () => {
  return {
    statusCode: 204,
    body: {},
  };
};

export const forbidden = (response?: Record<string, unknown>) => {
  return {
    statusCode: 403,
    body: response ? JSON.stringify(response) : '',
  };
};

export const notAllowed = (response?: Record<string, unknown>) => {
  return {
    statusCode: 406,
    body: response ? JSON.stringify(response) : '',
  };
};
