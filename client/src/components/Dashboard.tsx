import React, { useState } from 'react';
import { getLastThreeMonths } from '../utils/dateHelper'
import FileUpload from './FileUpload';
import MonthlyTrend from './MonthlyTrend';
import TopPLAccounts from './TopPLAccounts';
import useTopPLAccounts from './hooks/useTopPLAccounts';

const Dashboard = () => {
  const recentMonths = getLastThreeMonths();
  const [lastMonth, setLastMonth] = useState(recentMonths[0].id);
  const [refreshData, setRefreshData] = useState(false);

  const top5PLAccounts = useTopPLAccounts(lastMonth, refreshData);
  const handleMonthChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setLastMonth(event.target.value);

  return (
    <>
      <FileUpload onUploadSuccess={() => setRefreshData((val) => !val)} />

      <select onChange={(handleMonthChange)} value={lastMonth}>
        {recentMonths.map(({ id, value }) => (
            <option key={id} value={id}>
              {value}
            </option>
          ))}
      </select>
    
      <TopPLAccounts topPLAccounts={top5PLAccounts}/>
      <MonthlyTrend topPLAccounts={top5PLAccounts}/>
    </>
  );
};

export default Dashboard;
