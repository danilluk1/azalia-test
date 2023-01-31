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
  })
  apiKey: string;

  @Column({
    nullable: false,
  })
  insertedNumber: string;

  @Column({
    nullable: false,
  })
  previousNumber: string;

  @Column({
    nullable: false,
  })
  result: string;
}
