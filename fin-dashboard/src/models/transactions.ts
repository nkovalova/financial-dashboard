import axiosClient from '../utils/axiosClient';

interface ITransaction {

}

interface IReport {
    data: {
        plAccounts: string[];
        topPLAccounts: string[];
        monthlyTrend: string[];
    };
}

class TransactionsModel {
    async loadTransactions(): Promise<ITransaction[]> {
        return axiosClient.get('/api/transactions');
    }

    async loadReportByAccount(plAccount: string): Promise<IReport> {
        return axiosClient.get(`/api/report/trend/${plAccount}`);
    }
    
}

export default new TransactionsModel();
