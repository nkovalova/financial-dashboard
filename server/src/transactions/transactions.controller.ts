import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('File not provided');
    }

    await this.transactionsService.uploadCSV(file);

    return { message: 'File uploaded successfully' };
  }

  @Get('top5placcounts/:lastMonth')
  async getTop5PLAccounts(@Param('lastMonth') lastMonth: string) {
    const top5PLAccounts =
      await this.transactionsService.getTop5PLAccounts(lastMonth);
    return top5PLAccounts;
  }

  @Get('monthlytrend/:plAccountId')
  async getMonthlyTrend(@Param('plAccountId') plAccountId: number) {
    const monthlyTrend =
      await this.transactionsService.getMonthlyTrend(plAccountId);
    return monthlyTrend;
  }
}
