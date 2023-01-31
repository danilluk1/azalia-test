import { Type } from 'class-transformer';

export class NewNumber {
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
