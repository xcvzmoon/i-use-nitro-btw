import { defineConfig } from 'drizzle-kit';

import { dbOptions } from '~/database';

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    ...dbOptions,
    ssl: dbOptions.tls,
  },
  schema: './database/schemas/*.ts',
  out: './database/migrations',
  casing: 'snake_case',
  verbose: true,
  strict: true,
});
