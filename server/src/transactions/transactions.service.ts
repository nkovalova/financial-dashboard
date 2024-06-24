import * as csv from 'csv-parser';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { PLAccount } from './entities/pl_account.entity';
import { BestPracticeAccount } from './entities/best_practice_account.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    @InjectRepository(PLAccount)
    private plAccountsRepository: Repository<PLAccount>,
    @InjectRepository(BestPracticeAccount)
    private bestPracticeAccountRepository: Repository<BestPracticeAccount>,
  ) {}

  async uploadCSV(file: Express.Multer.File): Promise<true> {
    if (!file) {
      throw new Error('File not provided or invalid');
    }

    try {
      const transactions: any[] = [];
      const accountNames = new Set<string>();

      await new Promise((resolve, reject) => {
        fs.createReadStream(file.path)
          .pipe(csv())
          .on('data', (data: Record<string, string>) => {
            transactions.push({
              date: data['Date'],
              amount: parseFloat(data['Amount']),
              account: data['PL Account'],
              source: file.originalname,
            });
            accountNames.add(data['PL Account']);
          })
          .on('end', resolve)
          .on('error', reject);
      });

      const accountMap = await this.getAccounts(Array.from(accountNames));

      // Update transactions with account IDs
      transactions.forEach((transaction: any) => {
        transaction.plAccount = {
          id: accountMap.get(transaction.account),
        } as PLAccount;
        delete transaction.account;
      });

      // Saving transactions to the database
      const res = await this.transactionsRepository.save(transactions);
      console.log('res', res);
      return true;
    } finally {
      this.deleteFile(file.path);
    }
  }

  deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error when deleting a file: ${filePath}`, err);
      } else {
        console.log(`File successfully deleted: ${filePath}`);
      }
    });
  }

  async getAccounts(accountNames: string[]): Promise<Map<string, number>> {
    const bestPracticeAccounts: BestPracticeAccount[] =
      await this.bestPracticeAccountRepository.find();

    const existingAccounts: PLAccount[] = await this.plAccountsRepository.find({
      where: { name: In([...accountNames]) },
    });
    const existingAccountNames = new Set(
      existingAccounts.map((account) => account.name),
    );

    // Create new accounts for names that are not in the database
    const newAccountNames = [...accountNames].filter(
      (name) => !existingAccountNames.has(name),
    );
    const newAccounts = await this.plAccountsRepository.create(
      newAccountNames.map((name) => {
        const bestPracticeAccount = bestPracticeAccounts.find(
          (bpa) => bpa.name === name,
        );
        return { name, bestPracticeAccount };
      }),
    );
    await this.plAccountsRepository.save(newAccounts);

    // Merging existing and new accounts
    const allAccounts = [...existingAccounts, ...newAccounts];
    const accountMap = new Map(
      allAccounts.map((account) => [account.name, account.id]),
    );

    return accountMap;
  }

  async getTop5PLAccounts(lastMonth: string): Promise<
    {
      pl_account_id: number;
      name: string;
      total_amount: number;
    }[]
  > {
    const startDate = new Date(`${lastMonth}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);

    const topAccounts = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .select('transaction.pl_account_id', 'pl_account_id')
      .addSelect('SUM(transaction.amount)', 'total_amount')
      .leftJoin('transaction.plAccount', 'plAccount')
      .addSelect('plAccount.name', 'name')
      .where('transaction.date >= :startDate AND transaction.date < :endDate', {
        startDate,
        endDate,
      })
      .groupBy('transaction.pl_account_id')
      .addGroupBy('plAccount.name')
      .orderBy('total_amount', 'DESC')
      .limit(5)
      .getRawMany();

    return topAccounts;
  }

  async getReport(): Promise<
    {
      account_name: string;
      month: string;
      total_amount: number;
      is_best_practice_account: boolean;
    }[]
  > {
    return this.transactionsRepository
      .createQueryBuilder('transaction')
      .select([
        'plAccount.name AS account_name',
        "TO_CHAR(transaction.date, 'YYYY-MM') AS month",
        'SUM(transaction.amount) AS total_amount',
        'CASE WHEN plAccount.bestPracticeAccount IS NOT NULL THEN TRUE ELSE FALSE END AS is_best_practice_account',
      ])
      .leftJoin('transaction.plAccount', 'plAccount')
      .leftJoin('plAccount.bestPracticeAccount', 'bestPracticeAccount')
      .groupBy('plAccount.name, month, plAccount.bestPracticeAccount')
      .orderBy('plAccount.name, month')
      .getRawMany();
  }

  async getMonthlyTrend(plAccountId: number): Promise<
    {
      date: string;
      amount: number;
    }[]
  > {
    return this.transactionsRepository
      .createQueryBuilder('transaction')
      .select([
        "TO_CHAR(transaction.date, 'YYYY-MM-DD') AS date",
        'SUM(transaction.amount) AS amount',
      ])
      .where('transaction.pl_account_id = :plAccountId', { plAccountId })
      .groupBy('date')
      .orderBy('date', 'ASC')
      .getRawMany();
  }
}
