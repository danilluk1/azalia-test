import { CACHE_MANAGER, Controller, Inject } from '@nestjs/common';
import { NumbersService } from './numbers.service';

@Controller('numbers')
export class NumbersController {
  constructor(
    private numbersService: NumbersService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post()
  insertNewNum();
}
