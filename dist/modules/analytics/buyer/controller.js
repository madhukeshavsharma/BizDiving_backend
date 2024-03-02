"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchBuyerData = exports.uploadBuyerData = void 0;
const tslib_1 = require("tslib");
const HttpResponse_1 = require("../../../handlers/HttpResponse");
const processor_1 = require("./utils/processor");
const InternalServerException_1 = tslib_1.__importDefault(require("../../../handlers/InternalServerException"));
const parser_1 = require("../../../utilities/parser");
const model_1 = require("./model");
const knex_1 = require("../../../data/knex");
const winston_logger_1 = require("../../../utilities/logger/winston_logger");
const HttpException_1 = require("../../../handlers/HttpException");
async function uploadBuyerData(req, res) {
    try {
        const import_data = await (0, parser_1.readExcel)('Ch-30 Buyers Contact Details.xlsx');
        const { formated_buyer_data, buyer_warnings } = await (0, processor_1.processBuyerData)(import_data);
        const trx = await (0, knex_1.getTransaction)();
        try {
            winston_logger_1.logger.info('STARTING BATCH INSERTION FOR BUYER RECORDS');
            await (0, model_1.batchInsertBuyerData)(trx, formated_buyer_data, 1000);
            winston_logger_1.logger.info('BATCH INSERTION COMPLETED FOR BUYER RECORDS');
            await trx.commit();
        }
        catch (error) {
            await trx.rollback();
        }
        return (0, HttpResponse_1.HttpResponse)(res, 200, `${formated_buyer_data.length} records inserted`, {
            warnings: buyer_warnings.length,
            buyer_warnings,
        });
    }
    catch (error) {
        return (0, InternalServerException_1.default)(res, error);
    }
}
exports.uploadBuyerData = uploadBuyerData;
async function searchBuyerData(req, res) {
    try {
        const validation = model_1.search_buyer.validate(req.body);
        if (validation.error)
            throw new HttpException_1.HttpException(400, 1002, validation.error.details[0].message, {});
        const validated_req = validation.value;
        const searchResult = await (0, model_1.dynamicBuyerSearch)({
            search_text: validated_req.search_text,
            filter: validated_req.filter,
            pagination: validated_req.pagination,
        });
        return (0, HttpResponse_1.HttpResponse)(res, 200, `records fetched successfully`, searchResult);
    }
    catch (error) {
        return (0, InternalServerException_1.default)(res, error);
    }
}
exports.searchBuyerData = searchBuyerData;
//# sourceMappingURL=controller.js.map