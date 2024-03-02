import { IExcelImport } from '../types';
export declare function validateImportDataRow(row: IExcelImport, row_number: number): {
    errors: string[];
    warnings: string[];
};
