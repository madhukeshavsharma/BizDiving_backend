import { IExcelImport, IImport, IImporterDetails, ISupplierDetails } from '../types';
export declare function processImportData(data: IExcelImport[]): Promise<{
    formated_import_data: IImport[];
    supplier_details: ISupplierDetails[];
    importer_details: IImporterDetails[];
    import_warnings: string[];
}>;
