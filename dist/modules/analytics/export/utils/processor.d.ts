import { IBuyerDetails, IExcelExport, IExport, IExporterDetails } from '../type';
export declare function processExportData(data: IExcelExport[]): Promise<{
    formated_export_data: IExport[];
    exporter_details: IExporterDetails[];
    buyer_details: IBuyerDetails[];
    export_warnings: string[];
}>;
