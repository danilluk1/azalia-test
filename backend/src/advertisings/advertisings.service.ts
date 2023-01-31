import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AddAdvertisingDto, AdvertisingId } from './dtos/dtos';

@Injectable()
export class AdvertisingsService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async addAdvertising(addAdvDto: AddAdvertisingDto): Promise<AdvertisingId> {
    const id = await this.dataSource.query(
      `INSERT INTO advertisings (text, author) VALUES ($1, $2) RETURNING id;`,
      [addAdvDto.text, addAdvDto.author],
    );

    return id;
  }
}
