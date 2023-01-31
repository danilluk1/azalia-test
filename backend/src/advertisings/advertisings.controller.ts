import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  ForbiddenException,
} from '@nestjs/common';
import { AdvertisingsService } from './advertisings.service';
import { AddAdvertisingDto, AdvertisingId } from './dtos/dtos';

@Controller('advertisings')
export class AdvertisingsController {
  constructor(private advertisingsService: AdvertisingsService) {}

  @Post()
  async addMessage(
    @Body() addAdvDto: AddAdvertisingDto,
  ): Promise<AdvertisingId> {
    const id = await this.advertisingsService.addAdvertising(addAdvDto);
    return id;
  }

  @Get()
  async renderMessages() {
    const advs = await this.advertisingsService.getAdvertisings();
    return advs;
  }
}
