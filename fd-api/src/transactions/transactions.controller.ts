import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from '../entities/transaction.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async findAll(): Promise<Transaction[]> {
    console.log('filefindAll');

    return this.transactionsService.findAll();
  }

  @Post()
  async create(@Body() transaction: Transaction): Promise<Transaction> {
    return this.transactionsService.create(transaction);
  }
}
