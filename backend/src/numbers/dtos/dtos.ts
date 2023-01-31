import { Type } from 'class-transformer';
import { IsNumberString } from 'class-validator';

export class NewNumber {
  @IsNumberString()
  @Type(() => Number)
  number: number;
}

export class NewNumberResponse {
  previousNumber: number;
  currentNumber: number;
  result: number;
}

export class OperationDto extends NewNumberResponse {
  id: string;
}
