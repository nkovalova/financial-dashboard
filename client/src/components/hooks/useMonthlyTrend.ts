import { useState, useEffect } from 'react';
import transactionsModel from '../../models/transactions';
import { IAccount } from '../../types/account.types';
import { MonthTrend } from '../../types/report.types';

const useMonthlyTrend = (selectedAccountId?: IAccount['pl_account_id']) => {
  const [monthlyTrend, setMonthlyTrend] = useState<MonthTrend[]>([]);

  useEffect(() => {
    if (selectedAccountId) {
      const fetchMonthlyTrend = async () => {
        try {
          const res = await transactionsModel.fetchMonthlyTrend(selectedAccountId);
          setMonthlyTrend(res);
        } catch (error) {
          console.log('fetchMonthlyTrend error', error);
        }
      };

      fetchMonthlyTrend();
    }
  }, [selectedAccountId]);

  return monthlyTrend;
};

export default useMonthlyTrend;
