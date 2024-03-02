"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processBuyerData = void 0;
const winston_logger_1 = require("../../../../utilities/logger/winston_logger");
const validate_1 = require("./validate");
async function processBuyerData(data) {
    var _a, _b, _c, _d, _e, _f, _g;
    const formated_buyer_data = [];
    const buyer_errors = [];
    const buyer_warnings = [];
    winston_logger_1.logger.info('FORMATING BUYER DATA');
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const { errors, warnings } = (0, validate_1.validateBuyerDataRow)(row, i);
        if (errors.length > 0)
            buyer_errors.push(...errors);
        if (warnings.length > 0)
            buyer_warnings.push(...warnings);
        const formated_row = {
            company_name: (_a = row['Company Name']) === null || _a === void 0 ? void 0 : _a.toLowerCase(),
            contact_person: (_b = row['Contact Person']) === null || _b === void 0 ? void 0 : _b.toLowerCase(),
            designation: (_c = row.Designation) === null || _c === void 0 ? void 0 : _c.toLowerCase(),
            email_id: (_d = row['Email Id']) === null || _d === void 0 ? void 0 : _d.toLowerCase(),
            contact_no: (_e = row['Contact No']) === null || _e === void 0 ? void 0 : _e.toLowerCase(),
            address: (_f = row.Address) === null || _f === void 0 ? void 0 : _f.toLowerCase(),
            country: (_g = row.Country) === null || _g === void 0 ? void 0 : _g.toLowerCase(),
        };
        //undefined is returned if any of the rows does not contain a value
        formated_buyer_data.push(formated_row);
    }
    // if (import_errors.length > 0) {
    //   logger.error('EXCEL ERRORS ' + import_errors);
    //   throw new HttpException(400, 1202, 'Invalid Data found in excel', {
    //     errors: import_errors.length,
    //     warning: import_warnings.length,
    //     import_errors,
    //     import_warnings,
    //   });
    // }
    winston_logger_1.logger.info('FORMATING BUYER DATA COMPLETED');
    return {
        formated_buyer_data,
        buyer_warnings,
    };
}
exports.processBuyerData = processBuyerData;
//# sourceMappingURL=processor.js.map