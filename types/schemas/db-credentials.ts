import { z } from 'zod';

export const dbCredentialsSchema = z.object({
  host: z.string(),
  port: z.coerce.number(),
  database: z.string(),
  user: z.string(),
  password: z.string(),
  tls: z.transform((input) => input === 'true'),
});
