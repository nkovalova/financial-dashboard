import React from "react";
import { Bar } from "react-chartjs-2";
import { IAccount } from "../types/account.types";

const TopPLAccounts: React.FC<{ topPLAccounts: IAccount[] }> = ({
  topPLAccounts,
}) => {
  const top5PLAccountsData = {
    labels: topPLAccounts.map((account) => account.name),
    datasets: [
      {
        label: "Top 5 PL Accounts",
        data: topPLAccounts.map((account) => account.total_amount),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <h2>Top 5 PL Accounts</h2>
      <Bar
        options={{
          indexAxis: "y" as const,
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
        data={top5PLAccountsData}
      />
    </>
  );
};

export default TopPLAccounts;
