import { Injectable } from '@nestjs/common';
import * as csv from 'csv-parser';
import { createReadStream } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async processFile(file: Express.Multer.File): Promise<void> {
    const transactions = [];

    createReadStream(file.path)
      .pipe(csv())
      .on('data', (row) => {
        transactions.push(row);
      })
      .on('end', async () => {
        await this.transactionRepository.save(transactions);
      });
  }
}
