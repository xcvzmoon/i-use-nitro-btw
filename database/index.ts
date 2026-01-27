import { SQL } from 'bun';
import { drizzle } from 'drizzle-orm/bun-sql';
import { EnhancedQueryLogger } from 'drizzle-query-logger';
import { z } from 'zod';

const dbOptionsSchema = z.object({
  host: z.string(),
  port: z.coerce.number(),
  database: z.string(),
  user: z.string(),
  password: z.string(),
  tls: z.transform((input) => input === 'true'),
});

export const dbOptions = dbOptionsSchema.parse({
  host: Bun.env.DB_HOST,
  port: Bun.env.DB_PORT,
  database: Bun.env.DB_DATABASE,
  user: Bun.env.DB_USER,
  password: Bun.env.DB_PASSWORD,
  tls: Bun.env.DB_SSL,
});

const isProd = Bun.env.NODE_ENV === 'production';

export const db = drizzle({
  client: new SQL(dbOptions),
  logger: !isProd && new EnhancedQueryLogger(),
});
