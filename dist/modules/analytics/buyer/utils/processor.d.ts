import { IExcelBuyer, IBuyer } from '../types';
export declare function processBuyerData(data: IExcelBuyer[]): Promise<{
    formated_buyer_data: IBuyer[];
    buyer_warnings: string[];
}>;
