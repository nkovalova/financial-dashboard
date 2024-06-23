import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { IAccount } from "../types/account.types";
import { MonthTrend } from "../types/report.types";
import useMonthlyTrend from "./hooks/useMonthlyTrend";

interface Props {
  topPLAccounts: IAccount[];
}

const MonthlyTrend: React.FC<Props> = ({ topPLAccounts }) => {
  const [selectedAccount, setSelectedAccount] = useState<number>();
  const monthlyTrend: MonthTrend[] = useMonthlyTrend(selectedAccount);

  useEffect(() => {
    if (topPLAccounts.length) {
      setSelectedAccount(topPLAccounts[0].pl_account_id);
    }
  }, [topPLAccounts]);

  const handleAccountChange = (event: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => setSelectedAccount(Number(event.target.value));

  const monthlyTrendData = {
    labels: monthlyTrend.map((trend) => trend.date),
    datasets: [
      {
        label: "Monthly Trend",
        data: monthlyTrend.map((trend) => trend.amount),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  return (
    <>
      <h2>Monthly Trend</h2>
      <select
        onChange={handleAccountChange}
        value={selectedAccount}
        name="Select Account"
        defaultValue={selectedAccount}
      >
        {topPLAccounts.length &&
          topPLAccounts.map((account) => (
            <option key={account.pl_account_id} value={account.pl_account_id}>
              {account.name}
            </option>
          ))}
      </select>
      <Line
        data={monthlyTrendData}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </>
  );
};

export default MonthlyTrend;
