import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BestPracticeAccount } from './best_practice_account.entity';
import { Transaction } from './transaction.entity';

@Entity()
export class PLAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => BestPracticeAccount)
  @JoinColumn({ name: 'best_practice_id' })
  bestPracticeAccount: BestPracticeAccount;

  @OneToMany(() => Transaction, (transactions) => transactions.plAccount)
  transactions: Transaction[];
}
