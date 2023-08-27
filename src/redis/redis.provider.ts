import { createClient } from 'redis';

export const redisProvider = [
  {
    provide: 'REDIS_CLIENT',
    useFactory: async () => {
      const client = createClient({
        url: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
      });
      client.on('error', (err) => console.error('client err', err));
      await client.connect();
      return client;
    },
  },
];
