import { NewNumberResponse, OperationDto } from './dtos/dtos';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class NumbersService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async addNewNumber(
    apiKey: string,
    number: number,
    prevNumber: number,
  ): Promise<NewNumberResponse> {
    const average = (number + prevNumber) / 2;
    await this.dataSource.query(
      `INSERT INTO operations (api_key, inserted_number, previous_number, result) VALUES ($1, $2, $3, $4);`,
      [apiKey, number, prevNumber, average],
    );

    return {
      currentNumber: number,
      previousNumber: prevNumber,
      result: average,
    };
  }

  async getOperations(apiKey: string): Promise<OperationDto[]> {
    const operations = await this.dataSource.query(
      `SELECT id, inserted_number, previous_number, result FROM operations WHERE api_key = $1;`,
      [apiKey],
    );

    return operations as OperationDto[];
  }
}
