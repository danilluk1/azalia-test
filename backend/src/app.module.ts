import { NumbersModule } from './numbers/numbers.module';
import { Advertising } from './db/entities/advertising.entity';
import { AdvertisingModule } from './advertisings/advertisings.module';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { Operation } from './db/entities/operation.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: any) => ({
        type: 'postgres',
        host: configService.get('SQL_HOST'),
        port: +configService.get('SQL_PORT'),
        username: configService.get('SQL_USER'),
        password: configService.get('SQL_PASSWORD'),
        database: configService.get('SQL_DATABASE'),
        entities: [Advertising, Operation],
        synchronize: true,
      }),
    }),
    CacheModule.register({
      store: redisStore.redisStore as any,
      host: 'localhost',
      port: 6379,
      isGlobal: true,
    }),
    // CacheModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: any) => ({
    //     store: redisStore as any,
    //     host: configService.get('REDIS_HOST'),
    //     port: +configService.get('REDIS_PORT'),
    //     isGlobal: true,
    //   }),
    // }),
    AdvertisingModule,
    NumbersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
