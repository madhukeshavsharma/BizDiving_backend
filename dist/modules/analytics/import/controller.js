"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchImportData = exports.uploadImportData = void 0;
const tslib_1 = require("tslib");
const HttpResponse_1 = require("../../../handlers/HttpResponse");
const processor_1 = require("./utils/processor");
const InternalServerException_1 = tslib_1.__importDefault(require("../../../handlers/InternalServerException"));
const parser_1 = require("../../../utilities/parser");
const model_1 = require("./model");
const HttpException_1 = require("../../../handlers/HttpException");
const knex_1 = require("../../../data/knex");
const winston_logger_1 = require("../../../utilities/logger/winston_logger");
async function uploadImportData(req, res) {
    try {
        const import_data = await (0, parser_1.readExcel)('ALL INDIA IMPORT CH 30 DEC21.xlsx');
        const { formated_import_data, supplier_details, importer_details, import_warnings, } = await (0, processor_1.processImportData)(import_data);
        const trx = await (0, knex_1.getTransaction)();
        try {
            winston_logger_1.logger.info('STARTING BATCH INSERTION FOR IMPORT RECORDS');
            await (0, model_1.batchInsertImportData)(trx, formated_import_data, 1000);
            winston_logger_1.logger.info('BATCH INSERTION COMPLETED FOR IMPORT RECORDS');
            winston_logger_1.logger.info('STARTING BATCH INSERTION FOR IMPORTER DETAILS RECORDS');
            await (0, model_1.batchInsertImporterDetails)(trx, importer_details, 1000);
            winston_logger_1.logger.info('BATCH INSERTION COMPLETED FOR IMPORTER DETAILS RECORDS');
            winston_logger_1.logger.info('STARTING BATCH INSERTION FOR SUPPLIER DETAILS RECORDS');
            await (0, model_1.batchInsertSupplierDetails)(trx, supplier_details, 1000);
            winston_logger_1.logger.info('BATCH INSERTION COMPLETED FOR SUPPLIER DETAILS RECORDS');
            await trx.commit();
        }
        catch (error) {
            await trx.rollback();
        }
        return (0, HttpResponse_1.HttpResponse)(res, 200, `${formated_import_data.length} records inserted`, {
            warnings: import_warnings.length,
            import_warnings,
        });
    }
    catch (error) {
        return (0, InternalServerException_1.default)(res, error);
    }
}
exports.uploadImportData = uploadImportData;
async function searchImportData(req, res) {
    try {
        const validation = model_1.search_import.validate(req.body);
        if (validation.error)
            throw new HttpException_1.HttpException(400, 1002, validation.error.details[0].message, {});
        const validated_req = validation.value;
        const searchResult = await (0, model_1.dynamicImportSearch)({
            search_text: validated_req.search_text,
            filter: validated_req.filter,
            pagination: validated_req.pagination,
            duration: validated_req.duration,
        });
        return (0, HttpResponse_1.HttpResponse)(res, 200, `records fetched successfully`, searchResult);
    }
    catch (error) {
        return (0, InternalServerException_1.default)(res, error);
    }
}
exports.searchImportData = searchImportData;
//# sourceMappingURL=controller.js.map