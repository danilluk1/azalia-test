import {
  Body,
  CACHE_MANAGER,
  Controller,
  Inject,
  Headers,
  ForbiddenException,
  Post,
  Get,
} from '@nestjs/common';
import { NewNumber, NewNumberResponse, OperationDto } from './dtos/dtos';
import { NumbersService } from './numbers.service';
import { Cache } from 'cache-manager';

@Controller('numbers')
export class NumbersController {
  constructor(
    private numbersService: NumbersService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post()
  async postNewNumber(
    @Headers('api-key') apiKey: string,
    @Body() dto: any,
  ): Promise<NewNumberResponse> {
    if (!apiKey) {
      throw new ForbiddenException();
    }

    let prevNumber: number = await this.cacheManager.get<number>(apiKey);
    if (!prevNumber) {
      prevNumber = 0;
    }

    const res = await this.numbersService.addNewNumber(
      apiKey,
      dto.number,
      prevNumber,
    );

    await this.cacheManager.set(apiKey, dto.number);

    return res;
  }

  @Get()
  async getOperations(
    @Headers('api-key') apiKey: string,
  ): Promise<OperationDto[]> {
    if (!apiKey) {
      throw new ForbiddenException();
    }

    const operations = await this.numbersService.getOperations(apiKey);

    return operations.reverse();
  }
}
