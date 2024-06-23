import { useState, useEffect } from 'react';
import transactionsModel from '../../models/transactions';
import { IAccount } from '../../types/account.types';

const useTopPLAccounts = (lastMonth: string, refreshData: boolean): IAccount[] => {
  const [top5PLAccounts, setTop5PLAccounts] = useState<IAccount[]>([]);

  useEffect(() => {
    const fetchTop5PLAccounts = async () => {
      try {
        const res = await transactionsModel.fetchTop5PLAccounts(lastMonth);
        setTop5PLAccounts(res);
      } catch (error) {
        console.log('fetchTop5PLAccounts error', error);
      }
    };

    fetchTop5PLAccounts();
  }, [lastMonth, refreshData]);

  return top5PLAccounts;
};

export default useTopPLAccounts;
