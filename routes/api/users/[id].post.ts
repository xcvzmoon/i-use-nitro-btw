import {
  defineHandler,
  readValidatedBody,
  getValidatedQuery,
  getValidatedRouterParams,
} from 'nitro/h3';
import { z } from 'zod';

// example
// route: http://localhost:4862/api/users/17?email=mrgamilmonalbert@gmail.com
// body: { "name": "Mon Albert Gamil", "job": "Software Developer" }

const bodySchema = z.object({
  name: z.string(),
  job: z.string(),
});

const querySchema = z.object({
  email: z.email(),
});

const paramsSchema = z.object({
  id: z.coerce.number(),
});

export default defineHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema);
  const query = await getValidatedQuery(event, querySchema);
  const params = await getValidatedRouterParams(event, paramsSchema);

  return { body, query, params };
});
