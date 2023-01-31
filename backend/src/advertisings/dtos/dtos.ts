import { Type } from 'class-transformer';
import { Length } from 'class-validator';

export class AddAdvertisingDto {
  @Type(() => String)
  @Length(1, 200)
  text: string;

  @Type(() => String)
  @Length(5, 100)
  author: string;
}

export class AdvertisingDto extends AddAdvertisingDto {
  id: number;
}

export type AdvertisingId = number;
