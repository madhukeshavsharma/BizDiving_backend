import { Knex } from 'knex';
import { IDynamicSearchImportParams, IImport, IImporterDetails, ISupplierDetails } from './types';
import Joi from 'joi';
export declare const search_import_filter: Joi.ObjectSchema<any>;
export declare const pagination: Joi.ObjectSchema<any>;
export declare const duration: Joi.ObjectSchema<any>;
export declare const search_import: Joi.ObjectSchema<any>;
export declare function batchInsertImportData(trx: Knex.Transaction, insertRows: IImport[], batchSize: number): Promise<boolean>;
export declare function batchInsertImporterDetails(trx: Knex.Transaction, insertRows: IImporterDetails[], batchSize: number): Promise<boolean>;
export declare function batchInsertSupplierDetails(trx: Knex.Transaction, insertRows: ISupplierDetails[], batchSize: number): Promise<boolean>;
export declare function dynamicImportSearch(params: IDynamicSearchImportParams): Promise<{
    total_records: any;
    records: any;
}>;
