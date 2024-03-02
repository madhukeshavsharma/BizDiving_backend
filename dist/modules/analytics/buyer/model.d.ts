import { Knex } from 'knex';
import { IBuyer, IDynamicSearchBuyerParams } from './types';
import Joi from 'joi';
export declare const search_buyer_filter: Joi.ObjectSchema<any>;
export declare const pagination: Joi.ObjectSchema<any>;
export declare const duration: Joi.ObjectSchema<any>;
export declare const search_buyer: Joi.ObjectSchema<any>;
export declare function batchInsertBuyerData(trx: Knex.Transaction, insertRows: IBuyer[], batchSize: number): Promise<boolean>;
export declare function dynamicBuyerSearch(params: IDynamicSearchBuyerParams): Promise<{
    total_records: any;
    records: any;
}>;
