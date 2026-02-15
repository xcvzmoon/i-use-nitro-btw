import { SQL } from 'bun';
import { drizzle } from 'drizzle-orm/bun-sql';
import { EnhancedQueryLogger } from 'drizzle-query-logger';
import { dbCredentialsSchema } from '~/types/schemas/db-credentials';

const isProd = Bun.env.NODE_ENV === 'production';

export const dbOptions = dbCredentialsSchema.parse({
  host: Bun.env.DB_HOST,
  port: Bun.env.DB_PORT,
  database: Bun.env.DB_DATABASE,
  user: Bun.env.DB_USER,
  password: Bun.env.DB_PASSWORD,
  tls: Bun.env.DB_SSL,
});

export const db = drizzle({
  client: new SQL(dbOptions),
  logger: !isProd && new EnhancedQueryLogger(),
});
