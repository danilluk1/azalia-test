import { Module } from '@nestjs/common';
import { AdvertisingsController } from './advertisings.controller';
import { AdvertisingsService } from './advertisings.service';

@Module({
  imports: [],
  controllers: [AdvertisingsController],
  providers: [AdvertisingsService],
})
export class AdvertisingModule {}
