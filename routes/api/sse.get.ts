import { consola } from 'consola';
import { createEventStream, defineHandler } from 'nitro/h3';

export default defineHandler(async (event) => {
  const eventStream = createEventStream(event);
  const interval = setInterval(() => {
    void (async () => {
      try {
        await eventStream.push('Hello world');
      } catch {
        consola.error('Bun bug: Early return when stream is NOT locked');
        consola.info('Ignore for the meantime, as fixture has not yet been added in v1.3.9');
        await cleanup();
      }
    })();
  }, 1000);

  eventStream.onClosed(async () => {
    await cleanup();
  });

  async function cleanup() {
    consola.info('closing SSE...');
    clearInterval(interval);
    await eventStream.close();
  }

  return eventStream.send();
});
