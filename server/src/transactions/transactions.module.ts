import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './entities/transaction.entity';
import { PLAccount } from './entities/pl_account.entity';
import { MulterModule } from '@nestjs/platform-express';
import { BestPracticeAccount } from './entities/best_practice_account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, PLAccount, BestPracticeAccount]),
    MulterModule.register({
      dest: './uploads',
      preservePath: true,
    }),
  ],
  providers: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
