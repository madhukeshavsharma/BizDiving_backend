"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicImportSearch = exports.batchInsertSupplierDetails = exports.batchInsertImporterDetails = exports.batchInsertImportData = exports.search_import = exports.duration = exports.pagination = exports.search_import_filter = void 0;
const tslib_1 = require("tslib");
const knex_1 = require("../../../data/knex");
const winston_logger_1 = require("../../../utilities/logger/winston_logger");
const joi_1 = tslib_1.__importDefault(require("joi"));
const JoiDate = require('joi').extend(require('@joi/date'));
exports.search_import_filter = joi_1.default.object({
    type: joi_1.default.string().max(50).allow(''),
    cush: joi_1.default.string().max(255).allow(''),
    indian_port: joi_1.default.string().max(255).allow(''),
    mode_of_shipment: joi_1.default.string().max(100).allow(''),
    be_no: joi_1.default.string().max(255).allow(''),
    be_date: joi_1.default.string().max(50).allow(''),
    be_type: joi_1.default.string().max(50).allow(''),
    month: JoiDate.date().format('YYYY-MM-DD').raw(),
    cth_hscode: joi_1.default.string().max(255).allow(''),
    country_of_origin: joi_1.default.string().max(255).allow(''),
    invoice_currency: joi_1.default.string().max(100).allow(''),
    invoice_unit_price_fc: joi_1.default.number().allow(''),
    quantity: joi_1.default.number().allow(''),
    uqc: joi_1.default.string().max(100).allow(''),
    unit_price: joi_1.default.number().allow(''),
    total_ass_value: joi_1.default.number().allow(''),
    total_duty_paid: joi_1.default.number().allow(''),
    cha_name: joi_1.default.string().max(255).allow(''),
    iec: joi_1.default.string().max(255).allow(''),
    importer_name: joi_1.default.string().max(255).allow(''),
    port_of_shipment: joi_1.default.string().max(255).allow(''),
    supplier_name: joi_1.default.string().max(255).allow(''),
    importer_city_state: joi_1.default.string().max(255).allow(''),
    importer_pin: joi_1.default.string().max(100).allow(''),
    importer_phone: joi_1.default.string().max(255).allow(''),
    importer_mail: joi_1.default.string().max(255).allow(''),
    importer_contact_person_1: joi_1.default.string().max(255).allow(''),
    importer_contact_person_2: joi_1.default.string().max(255).allow(''),
});
exports.pagination = joi_1.default.object({
    page_index: joi_1.default.number().required(),
    page_size: joi_1.default.number().required(),
});
exports.duration = joi_1.default.object({
    start_date: JoiDate.date().format('YYYY-MM-DD').raw().required(),
    end_date: JoiDate.date().format('YYYY-MM-DD').raw().required(),
});
exports.search_import = joi_1.default.object({
    search_text: joi_1.default.string().min(3).max(70),
    filter: exports.search_import_filter,
    pagination: exports.pagination,
    duration: exports.duration,
});
async function batchInsertImportData(trx, insertRows, batchSize) {
    try {
        const data = await knex_1.DB.write
            .batchInsert('import', insertRows, batchSize)
            .returning('id')
            .transacting(trx);
        winston_logger_1.logger.info(`TOTAL RECORDS INSERTED IN IMPORT TABLE: ${data.length}`);
        // logger.info(JSON.stringify(data));
        return true;
    }
    catch (error) {
        winston_logger_1.logger.error('ERROR RASIED WHILE BATCH INSERTION IN IMPORT TABLE');
        throw error;
    }
}
exports.batchInsertImportData = batchInsertImportData;
async function batchInsertImporterDetails(trx, insertRows, batchSize) {
    try {
        const data = await knex_1.DB.write
            .batchInsert('importer_details', insertRows, batchSize)
            .returning('id')
            .transacting(trx);
        winston_logger_1.logger.info(`TOTAL RECORDS INSERTED IN importer_details TABLE: ${data.length}`);
        // logger.info(JSON.stringify(data));
        return true;
    }
    catch (error) {
        winston_logger_1.logger.error('ERROR RASIED WHILE BATCH INSERTION IN importer_details TABLE');
        throw error;
    }
}
exports.batchInsertImporterDetails = batchInsertImporterDetails;
async function batchInsertSupplierDetails(trx, insertRows, batchSize) {
    try {
        const data = await knex_1.DB.write
            .batchInsert('supplier_details', insertRows, batchSize)
            .returning('id')
            .transacting(trx);
        winston_logger_1.logger.info(`TOTAL RECORDS INSERTED IN supplier_details TABLE: ${data.length}`);
        // logger.info(JSON.stringify(data));
        return true;
    }
    catch (error) {
        winston_logger_1.logger.error('ERROR RASIED WHILE BATCH INSERTION IN supplier_details TABLE');
        throw error;
    }
}
exports.batchInsertSupplierDetails = batchInsertSupplierDetails;
async function dynamicImportSearch(params) {
    let DBQuery = knex_1.DB.read.from('import');
    if (params.duration) {
        DBQuery = DBQuery.whereRaw(`month between '${params.duration.start_date}' and '${params.duration.end_date}'`);
    }
    if (params.filter) {
        if (params.filter.type) {
            DBQuery = DBQuery.where('type', params.filter.type);
        }
        if (params.filter.cush) {
            DBQuery = DBQuery.where('cush', params.filter.cush);
        }
        if (params.filter.indian_port) {
            DBQuery = DBQuery.where('indian_port', params.filter.indian_port);
        }
        if (params.filter.mode_of_shipment) {
            DBQuery = DBQuery.where('mode_of_shipment', params.filter.mode_of_shipment);
        }
        if (params.filter.be_no) {
            DBQuery = DBQuery.where('be_no', params.filter.be_no);
        }
        if (params.filter.be_date) {
            DBQuery = DBQuery.where('be_date', params.filter.be_date);
        }
        if (params.filter.month) {
            DBQuery = DBQuery.where('month', params.filter.month);
        }
        if (params.filter.cth_hscode) {
            DBQuery = DBQuery.where('cth_hscode', params.filter.cth_hscode);
        }
        if (params.filter.country_of_origin) {
            DBQuery = DBQuery.where('country_of_origin', params.filter.country_of_origin);
        }
        if (params.filter.invoice_currency) {
            DBQuery = DBQuery.where('invoice_currency', params.filter.invoice_currency);
        }
        if (params.filter.invoice_unit_price_fc) {
            DBQuery = DBQuery.where('invoice_unit_price_fc', params.filter.invoice_unit_price_fc);
        }
        if (params.filter.quantity) {
            DBQuery = DBQuery.where('quantity', params.filter.quantity);
        }
        if (params.filter.uqc) {
            DBQuery = DBQuery.where('uqc', params.filter.uqc);
        }
        if (params.filter.unit_price) {
            DBQuery = DBQuery.where('unit_price', params.filter.unit_price);
        }
        if (params.filter.total_ass_value) {
            DBQuery = DBQuery.where('total_ass_value', params.filter.total_ass_value);
        }
        if (params.filter.total_duty_paid) {
            DBQuery = DBQuery.where('total_duty_paid', params.filter.total_duty_paid);
        }
        if (params.filter.cha_name) {
            DBQuery = DBQuery.where('cha_name', params.filter.cha_name);
        }
        if (params.filter.iec) {
            DBQuery = DBQuery.where('iec', params.filter.iec);
        }
        if (params.filter.importer_name) {
            DBQuery = DBQuery.where('importer_name', params.filter.importer_name);
        }
        if (params.filter.importer_city_state) {
            DBQuery = DBQuery.where('importer_city_state', params.filter.importer_city_state);
        }
        if (params.filter.importer_pin) {
            DBQuery = DBQuery.where('importer_pin', params.filter.importer_pin);
        }
        if (params.filter.importer_phone) {
            DBQuery = DBQuery.where('importer_phone', params.filter.importer_phone);
        }
        if (params.filter.importer_mail) {
            DBQuery = DBQuery.where('importer_mail', params.filter.importer_mail);
        }
        if (params.filter.importer_contact_person_1) {
            DBQuery = DBQuery.where('importer_contact_person_1', params.filter.importer_contact_person_1);
        }
        if (params.filter.importer_contact_person_2) {
            DBQuery = DBQuery.where('importer_contact_person_2', params.filter.importer_contact_person_2);
        }
    }
    if (params.search_text) {
        winston_logger_1.logger.info(`SEARCHING IN IMPORT DATA WITH SEARCH TEXT ${params.search_text}`);
        if (params.filter) {
            if (params.filter.cth_hscode) {
                DBQuery = DBQuery.whereLike('cth_hscode', `%${params.search_text || ''}%`);
            }
            if (params.filter.country_of_origin) {
                DBQuery = DBQuery.whereLike('country_of_origin', `%${params.search_text || ''}%`);
            }
            if (params.filter.importer_name) {
                DBQuery = DBQuery.whereLike('importer_name', `%${params.search_text || ''}%`);
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
    // console.log('IMPORT SEARCH QUERY: ', DBQuery.toSQL().toNative());
    const records = await DBQuery.clone().select('*');
    return {
        total_records: total_records[0].count,
        records,
    };
}
exports.dynamicImportSearch = dynamicImportSearch;
//# sourceMappingURL=model.js.map