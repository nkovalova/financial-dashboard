import { useState, useEffect } from 'react';
import transactionsModel from '../../models/transactions';
import { IAccount, IReport } from '../../types/report.types';

const useTopPLAccounts = (lastMonth: string, refreshData: boolean): {
  top5PLAccounts: IAccount[],
  report: IReport[],
} => {
  const [top5PLAccounts, setTop5PLAccounts] = useState<IAccount[]>([]);
  const [report, setReport] = useState<IAccount[]>([]);

  useEffect(() => {
    const fetchTop5PLAccounts = async () => {
      try {
        const res = await transactionsModel.fetchTop5PLAccounts(lastMonth);
        setTop5PLAccounts(res);
      } catch (error) {
        console.log('fetchTop5PLAccounts error', error);
      }
    };

    const fetchReport = async () => {
      try {
        const res = await transactionsModel.fetchReport();
        setReport(res);
      } catch (error) {
        console.log('report error', error);
      }
    };

    fetchTop5PLAccounts();
    fetchReport();
  }, [lastMonth, refreshData]);

  return { top5PLAccounts, report };
};

export default useTopPLAccounts;
