import { Body, Controller, Get, Post, Render } from '@nestjs/common';
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
  @Render('index')
  async renderMessages() {
    return { message: 'Hello, World!' };
  }
}
