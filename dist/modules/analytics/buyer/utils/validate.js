"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBuyerDataRow = void 0;
const helper_1 = require("../../../../utilities/helper");
function validateBuyerDataRow(row, row_number) {
    //columns headers take 1 row and array start from 0 index
    row_number = row_number + 2;
    const errors = [];
    const warnings = [];
    if ((0, helper_1.isEmpty)(row['Company Name']))
        warnings.push(`Company Name is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row['Contact Person']))
        warnings.push(`Contact Person is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Designation))
        warnings.push(`Designation is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row['Email Id']))
        warnings.push(`Email Id is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row['Contact No']))
        warnings.push(`Contact No is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Address))
        warnings.push(`Address is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Country))
        warnings.push(`Country is missing at row number ${row_number}`);
    return { errors, warnings };
}
exports.validateBuyerDataRow = validateBuyerDataRow;
//# sourceMappingURL=validate.js.map