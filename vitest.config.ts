import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['./tests/k6/**.test.ts'],
    include: ['./tests/vitest/**.{test,spec}.ts'],
  },
});
