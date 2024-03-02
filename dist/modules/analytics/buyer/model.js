"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicBuyerSearch = exports.batchInsertBuyerData = exports.search_buyer = exports.duration = exports.pagination = exports.search_buyer_filter = void 0;
const tslib_1 = require("tslib");
const knex_1 = require("../../../data/knex");
const winston_logger_1 = require("../../../utilities/logger/winston_logger");
const joi_1 = tslib_1.__importDefault(require("joi"));
const JoiDate = require('joi').extend(require('@joi/date'));
exports.search_buyer_filter = joi_1.default.object({
    company_name: joi_1.default.string().max(255).allow(''),
    contact_person: joi_1.default.string().max(255).allow(''),
    designation: joi_1.default.string().max(255).allow(''),
    email_id: joi_1.default.string().max(255).allow(''),
    contact_no: joi_1.default.string().max(255).allow(''),
    address: joi_1.default.string().max(255).allow(''),
    country: joi_1.default.string().max(255).allow(''),
});
exports.pagination = joi_1.default.object({
    page_index: joi_1.default.number().required(),
    page_size: joi_1.default.number().required(),
});
exports.duration = joi_1.default.object({
    start_date: JoiDate.date().format('YYYY-MM-DD').raw().required(),
    end_date: JoiDate.date().format('YYYY-MM-DD').raw().required(),
});
exports.search_buyer = joi_1.default.object({
    search_text: joi_1.default.string().min(3).max(70),
    filter: exports.search_buyer_filter,
    pagination: exports.pagination,
    duration: exports.duration,
});
async function batchInsertBuyerData(trx, insertRows, batchSize) {
    try {
        const data = await knex_1.DB.write
            .batchInsert('buyer', insertRows, batchSize)
            .returning('id')
            .transacting(trx);
        winston_logger_1.logger.info(`TOTAL RECORDS INSERTED IN BUYER TABLE: ${data.length}`);
        // logger.info(JSON.stringify(data));
        return true;
    }
    catch (error) {
        winston_logger_1.logger.error('ERROR RASIED WHILE BATCH INSERTION IN BUYER TABLE');
        throw error;
    }
}
exports.batchInsertBuyerData = batchInsertBuyerData;
async function dynamicBuyerSearch(params) {
    let DBQuery = knex_1.DB.read.from('buyer');
    if (params.filter) {
        if (params.filter.company_name) {
            DBQuery = DBQuery.where('company_name', params.filter.company_name);
        }
        if (params.filter.contact_person) {
            DBQuery = DBQuery.where('contact_person', params.filter.contact_person);
        }
        if (params.filter.designation) {
            DBQuery = DBQuery.where('designation', params.filter.designation);
        }
        if (params.filter.email_id) {
            DBQuery = DBQuery.where('email_id', params.filter.email_id);
        }
        if (params.filter.contact_no) {
            DBQuery = DBQuery.where('contact_no', params.filter.contact_no);
        }
        if (params.filter.address) {
            DBQuery = DBQuery.where('address', params.filter.address);
        }
        if (params.filter.country) {
            DBQuery = DBQuery.where('country', params.filter.country);
        }
    }
    if (params.search_text) {
        winston_logger_1.logger.info(`SEARCHING IN BUYER DATA WITH SEARCH TEXT ${params.search_text}`);
        if (params.filter) {
            if (params.filter.company_name) {
                DBQuery = DBQuery.whereLike('company_name', `%${params.search_text || ''}%`);
            }
        }
    }
    const total_records = await DBQuery.clone().count();
    winston_logger_1.logger.info(`FOUND ${total_records[0].count} SEARCH RESULT RECORDS`);
    if (params.pagination) {
        if (params.pagination.page_size) {
            const offset = (params.pagination.page_index || 0) * params.pagination.page_size;
            DBQuery = DBQuery.offset(offset).limit(params.pagination.page_size);
        }
    }
    else {
        DBQuery = DBQuery.offset(0).limit(20);
    }
    // console.log('BUYER SEARCH QUERY: ', DBQuery.toSQL().toNative());
    const records = await DBQuery.clone().select('*');
    return {
        total_records: total_records[0].count,
        records,
    };
}
exports.dynamicBuyerSearch = dynamicBuyerSearch;
//# sourceMappingURL=model.js.map