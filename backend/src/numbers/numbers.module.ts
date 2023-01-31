import { Module } from '@nestjs/common';
import { NumbersController } from './numbers.controller';
import { NumbersService } from './numbers.service';

@Module({
  imports: [],
  controllers: [NumbersController],
  providers: [NumbersService],
})
export class NumbersModule {}
