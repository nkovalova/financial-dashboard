import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: TransactionsService,
          useValue: {
            uploadCSV: jest.fn(),
            getTop5PLAccounts: jest.fn(),
            getMonthlyTrend: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should upload a file successfully', async () => {
      const file = {
        originalname: 'test.csv',
        buffer: Buffer.from(''),
      } as Express.Multer.File;

      jest.spyOn(service, 'uploadCSV').mockResolvedValue(true);

      const result = await controller.uploadFile(file);

      expect(result).toEqual({ message: 'File uploaded successfully' });
      expect(service.uploadCSV).toHaveBeenCalledWith(file);
    });

    it('should throw an error if file is not provided', async () => {
      await expect(controller.uploadFile(undefined)).rejects.toThrow(
        'File not provided',
      );
    });
  });

  describe('getTop5PLAccounts', () => {
    it('should return top 5 PL accounts', async () => {
      const lastMonth = '2024-05';
      const top5PLAccounts = [
        { pl_account_id: 1, total_amount: 1000, name: 'Sales' },
      ];

      jest
        .spyOn(service, 'getTop5PLAccounts')
        .mockResolvedValue(top5PLAccounts);

      const result = await controller.getTop5PLAccounts(lastMonth);

      expect(result).toEqual(top5PLAccounts);
      expect(service.getTop5PLAccounts).toHaveBeenCalledWith(lastMonth);
    });
  });

  describe('getMonthlyTrend', () => {
    it('should return monthly trend for given account', async () => {
      const plAccountId = 1;
      const monthlyTrend = [{ date: '2024-01-01', amount: 1000 }];

      jest.spyOn(service, 'getMonthlyTrend').mockResolvedValue(monthlyTrend);

      const result = await controller.getMonthlyTrend(plAccountId);

      expect(result).toEqual(monthlyTrend);
      expect(service.getMonthlyTrend).toHaveBeenCalledWith(plAccountId);
    });
  });
});
