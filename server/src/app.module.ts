import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TransactionsModule } from './transactions/transactions.module';
import { RecommendationsService } from './recommendations/recommendations.service';
import { RecommendationsModule } from './recommendations/recommendations.module';
import ormconfig from './config/ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormconfig.options),
    TransactionsModule,
    RecommendationsModule,
  ],
  providers: [RecommendationsService],
})
export class AppModule {}
