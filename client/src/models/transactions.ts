import { IAccount } from "../types/account.types";
import { MonthTrend } from "../types/report.types";
import axiosClient from "../utils/axiosClient";

class TransactionsModel {
  uploadCsv(formData: FormData): Promise<boolean> {
    return axiosClient.post("/transactions/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async fetchTop5PLAccounts(lastMonth: string): Promise<IAccount[]> {
    const response = await axiosClient.get(
      `transactions/top5placcounts/${lastMonth}`
    );
    return response.data;
  }

  async fetchMonthlyTrend(selectedAccountId?: number): Promise<MonthTrend[]> {
    const response = await axiosClient.get(
      `transactions/monthlytrend/${selectedAccountId}`
    );
    return response.data;
  }
}

export default new TransactionsModel();
