"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchExportData = exports.uploadExportData = void 0;
const tslib_1 = require("tslib");
const HttpException_1 = require("../../../handlers/HttpException");
const HttpResponse_1 = require("../../../handlers/HttpResponse");
const InternalServerException_1 = tslib_1.__importDefault(require("../../../handlers/InternalServerException"));
const parser_1 = require("../../../utilities/parser");
const model_1 = require("./model");
const processor_1 = require("./utils/processor");
const winston_logger_1 = require("../../../utilities/logger/winston_logger");
const knex_1 = require("../../../data/knex");
async function uploadExportData(req, res) {
    try {
        const export_data = await (0, parser_1.readExcel)('ALL INDIA EXPORT CH 30 DEC21.xlsx');
        const { formated_export_data, exporter_details, buyer_details, export_warnings, } = await (0, processor_1.processExportData)(export_data);
        const trx = await (0, knex_1.getTransaction)();
        try {
            winston_logger_1.logger.info('STARTING BATCH INSERTION FOR EXPORT RECORDS');
            await (0, model_1.batchInsertExportData)(trx, formated_export_data, 1000);
            winston_logger_1.logger.info('BATCH INSERTION COMPLETED FOR EXPORT RECORDS');
            winston_logger_1.logger.info('STARTING BATCH INSERTION FOR EXPORTER DETAILS RECORDS');
            await (0, model_1.batchInsertExporterDetails)(trx, exporter_details, 1000);
            winston_logger_1.logger.info('BATCH INSERTION COMPLETED FOR EXPORTER DETAILS RECORDS');
            winston_logger_1.logger.info('STARTING BATCH INSERTION FOR BUYER DETAILS RECORDS');
            await (0, model_1.batchInsertBuyerDetails)(trx, buyer_details, 1000);
            winston_logger_1.logger.info('BATCH INSERTION COMPLETED FOR BUYER DETAILS RECORDS');
            await trx.commit();
        }
        catch (error) {
            await trx.rollback();
            throw error;
        }
        return (0, HttpResponse_1.HttpResponse)(res, 200, `${formated_export_data.length} records inserted`, {
            warnings: export_warnings.length,
            export_warnings,
        });
    }
    catch (error) {
        return (0, InternalServerException_1.default)(res, error);
    }
}
exports.uploadExportData = uploadExportData;
async function searchExportData(req, res) {
    try {
        const validation = model_1.search_export.validate(req.body);
        if (validation.error)
            throw new HttpException_1.HttpException(400, 1002, validation.error.details[0].message, {});
        const validated_req = validation.value;
        const searchResult = await (0, model_1.dynamicExportSearch)({
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
exports.searchExportData = searchExportData;
//# sourceMappingURL=controller.js.map