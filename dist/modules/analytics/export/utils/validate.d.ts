import { IExcelExport } from '../type';
export declare function validateExportDataRow(row: IExcelExport, row_number: number): {
    errors: string[];
    warnings: string[];
};
