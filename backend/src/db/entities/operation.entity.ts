import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('operations', { schema: 'public' })
export class Operation {
  @PrimaryColumn('text', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Column({
    nullable: false,
    name: 'api_key',
  })
  apiKey: string;

  @Column({
    nullable: false,
    name: 'inserted_number',
  })
  insertedNumber: string;

  @Column({
    nullable: false,
    name: 'previous_number',
  })
  previousNumber: string;

  @Column({
    nullable: false,
    name: 'result',
  })
  result: string;
}
