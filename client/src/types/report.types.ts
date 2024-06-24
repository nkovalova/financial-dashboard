export interface IAccount {
    pl_account_id: number;
    name: string;
    total_amount: string;
}

export type MonthTrend = { date: string; amount: number }

export type PLAccount = { account: string; amount: number }

export type IReport = {
    pl_account_id: number;
    account_name: string;
    month: string;
    total_amount: number;
    is_best_practice_account: boolean;
}
