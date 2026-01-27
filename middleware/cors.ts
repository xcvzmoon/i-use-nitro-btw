import { eventHandler, handleCors } from 'nitro/h3';

export default eventHandler((event) => {
  handleCors(event, {
    origin: '*',
    methods: '*',
    preflight: {
      statusCode: 204,
    },
  });
});
