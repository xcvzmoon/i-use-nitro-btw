import { $ } from 'bun';
import { defineHandler } from 'nitro/h3';

export default defineHandler(async (event) => {
  const welcome = await $`echo "Hello from API!"`.text();
  return { message: welcome };
});
