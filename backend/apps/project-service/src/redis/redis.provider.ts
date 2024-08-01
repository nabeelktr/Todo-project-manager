import { Provider } from '@nestjs/common';
import { Redis } from 'ioredis';

export const redisProvider: Provider = {
  provide: 'REDIS_CLIENT',
  useFactory: () => {
    return new Redis({
      host: 'redis',
      port: 6379,        
    });
  },
};
