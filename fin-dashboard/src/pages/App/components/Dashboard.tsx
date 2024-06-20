import React, { useEffect, useState } from 'react';
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

import transactionsModel from '../../../models/transactions';

const Dashboard = () => {
  const [reportPlAccounts, setReportPlAccounts] = useState([]);
  const [topPLAccounts, setTopPLAccounts] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [selectedPLAccount, setSelectedPLAccount] = useState('');

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    await transactionsModel.loadTransactions()
    .then((data) => {
      console.log(data)

      setReport(data.plAccounts);
      setTopPLAccounts(data.topPLAccounts);
      setMonthlyTrend(data.monthlyTrend);
    });
  };

  const handlePLAccountChange = async (e) => {
    const plAccount = e.target.value;
    setSelectedPLAccount(plAccount);
    const response = await transactionsModel.loadReportByAccount(plAccount);
    setMonthlyTrend(response.data);
  };

  return (
    <div>
      <BarChart width={600} height={300} data={topPLAccounts}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="plAccount" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>

      <select onChange={handlePLAccountChange} value={selectedPLAccount}>
        {reportPlAccounts?.map((account) => (
          <option key={account} value={account}>
            {account}
          </option>
        ))}
      </select>

      <LineChart width={600} height={300} data={monthlyTrend}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Dashboard;
