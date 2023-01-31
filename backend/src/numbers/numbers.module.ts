import { CacheModule, Module } from '@nestjs/common';
import { NumbersController } from './numbers.controller';
import { NumbersService } from './numbers.service';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: any) => ({
        store: redisStore.redisStore as any,
        host: 'redis',
        port: +configService.get('REDIS_PORT'),
      }),
    }),
  ],
  controllers: [NumbersController],
  providers: [NumbersService],
})
export class NumbersModule {}
