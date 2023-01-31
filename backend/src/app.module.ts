import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
        entities: [],
        synchronize: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
