import { IExcelBuyer } from '../types';
export declare function validateBuyerDataRow(row: IExcelBuyer, row_number: number): {
    errors: string[];
    warnings: string[];
};
