import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { badRequest, ok } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const name = event.body.name.trim().slice(0, 50);
  if (!name) {
    return badRequest({ message: 'name must not be empty' });
  }

  return ok({
    message: `Hello ${name}, welcome to the exciting Serverless world!`,
  });
};

export const main = middyfy(hello);
