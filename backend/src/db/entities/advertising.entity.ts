import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('advertisings', { schema: 'public' })
export class Advertising {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  text: string;

  @Column({
    nullable: false,
  })
  author: string;
}
