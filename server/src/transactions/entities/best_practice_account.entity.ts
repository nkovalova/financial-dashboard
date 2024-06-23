import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BestPracticeAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
