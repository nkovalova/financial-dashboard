import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PLAccount } from './pl_account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column('decimal')
  amount: number;

  @ManyToOne(() => PLAccount, (plAccount) => plAccount.transactions)
  @JoinColumn({ name: 'pl_account_id' })
  plAccount: PLAccount;

  @Column({ nullable: true })
  description: string;

  @Column()
  source: string;
}
