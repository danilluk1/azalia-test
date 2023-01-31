import { Type } from 'class-transformer';

export class NewNumber {
  @Type(() => Number)
  number: number;
  // isNegative: boolean;
  // isFraction: boolean;
}

export class NewNumberResponse {
  previousNumber: number;
  currentNumber: number;
  result: number;
}

export class OperationDto {
  id: string;
  insertedNumber: number;
  previousNumber: number;
  result: number;
}
