import { Knex } from 'knex';
import Joi from 'joi';
import { IBuyerDetails, IDynamicSearchExportParams, IExport, IExporterDetails } from './type';
export declare const search_export_filter: Joi.ObjectSchema<any>;
export declare const pagination: Joi.ObjectSchema<any>;
export declare const duration: Joi.ObjectSchema<any>;
export declare const search_export: Joi.ObjectSchema<any>;
export declare function batchInsertExportData(trx: Knex.Transaction, insertRows: IExport[], batchSize: number): Promise<boolean>;
export declare function batchInsertExporterData(trx: Knex.Transaction, insertRows: IExport[], batchSize: number): Promise<boolean>;
export declare function batchInsertExporterDetails(trx: Knex.Transaction, insertRows: IExporterDetails[], batchSize: number): Promise<boolean>;
export declare function batchInsertBuyerDetails(trx: Knex.Transaction, insertRows: IBuyerDetails[], batchSize: number): Promise<boolean>;
export declare function dynamicExportSearch(params: IDynamicSearchExportParams): Promise<{
    total_records: any;
    records: any;
}>;
