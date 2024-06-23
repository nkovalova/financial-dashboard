import React, { useEffect, useState } from 'react';
import { getLastThreeMonths } from '../utils/dateHelper'
import FileUpload from './FileUpload';
import MonthlyTrend from './MonthlyTrend';
import TopPLAccounts from './TopPLAccounts';
import useTopPLAccounts from './hooks/useTopPLAccounts';
import useRecommendations from './hooks/useRecommendations';

const Dashboard = () => {
  const recentMonths = getLastThreeMonths();
  const [lastMonth, setLastMonth] = useState(recentMonths[0].id);
  const [refreshData, setRefreshData] = useState(false);
  const { recommendations, fetchRecommendations, loading } = useRecommendations();

  const top5PLAccounts = useTopPLAccounts(lastMonth, refreshData);
  const handleMonthChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setLastMonth(event.target.value);

  useEffect(() => {
    fetchRecommendations({ lastMonth });
  }, [lastMonth]);

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
      3. Get output in the report that should be grouped by PL accounts and months
      Report 
        
      <TopPLAccounts topPLAccounts={top5PLAccounts}/>
      <MonthlyTrend topPLAccounts={top5PLAccounts}/>

      {loading ? <p>Loading recommendations...</p> : <p>Recommendations: {recommendations}</p>}
    </>
  );
};

export default Dashboard;
