import React from "react";
import { IReport } from "../../types/report.types";
import styles from "./Repors.module.css";

interface Props {
  report: IReport[];
}

const Report: React.FC<Props> = ({ report }) => {
  const accountsMap = new Map();
  const monthsSet = new Set<string>();

  report.forEach(item => {
    if (!accountsMap.has(item.account_name)) {
      accountsMap.set(item.account_name, {
        values: new Map(),
        best_practice_account: item.is_best_practice_account
      });
    }
    accountsMap.get(item.account_name).values.set(item.month, item.total_amount);
    monthsSet.add(item.month);
  });

  const months = Array.from(monthsSet).sort();

  return (
    <>
      <h2>PL Accounts Report</h2>
      {!report.length ? <div className={styles.nodata}>No data to display</div> : <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Account Name</th>
              {months.map(month => (
                <th key={month}>{month}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from(accountsMap.entries()).map(([account_name, data], index) => (
              <tr key={index} className={data.best_practice_account ? styles.bestpractice : ''}>
                <td>{account_name}</td>
                {months.map((month, idx) => (
                  <td key={idx}>{data.values.get(month) || 0}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </>
  );
};

export default Report;
