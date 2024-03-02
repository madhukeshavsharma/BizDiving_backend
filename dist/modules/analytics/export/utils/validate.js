"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateExportDataRow = void 0;
const helper_1 = require("../../../../utilities/helper");
function validateExportDataRow(row, row_number) {
    //columns headers take 1 row and array start from 0 index
    row_number = row_number + 2;
    const errors = [];
    const warnings = [];
    if ((0, helper_1.isEmpty)(row.Type))
        errors.push(`Type is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row['Sbill No']))
        errors.push(`Sbill No is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row['Sbill Date']))
        errors.push(`Sbill Date is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row['Port of Loading']))
        errors.push(`Port of Loading is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row['Mode of Shipment']))
        errors.push(`Mode of Shipment is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row['Port Code']))
        errors.push(`Port Code is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Month))
        warnings.push(`Month is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row['HS Code']))
        errors.push(`HS Code is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row['Item Description']))
        errors.push(`Item Description is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Quantity))
        errors.push(`Quantity is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.UQC))
        errors.push(`UQC is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row['Unit Rate in FC']))
        errors.push(`Unit Rate in FC is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Currency))
        errors.push(`Currency is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row['Unit Value in INR']))
        errors.push(`Unit Value in INR is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row['Total FOB Value in INR']))
        errors.push(`Total FOB Value in INR is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row['Invoice No']))
        errors.push(`Invoice No is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row['Port of Discharge']))
        errors.push(`Port of Discharge is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Country))
        errors.push(`Country is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row['Buyer Name']))
        errors.push(`Buyer Name is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Buyer_Address))
        warnings.push(`Buyer_Address is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.IEC))
        errors.push(`IEC is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row['Exporter Name']))
        errors.push(`Exporter Name is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Exporter_Address))
        errors.push(`Exporter_Address is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Exporter_City_State))
        warnings.push(`Exporter_City_State is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Exporter_PIN))
        warnings.push(`Exporter_PIN is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Exporter_Phone))
        warnings.push(`Exporter_Phone is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Exporter_mail))
        warnings.push(`Exporter_mail is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Exporter_Contact_Person_1))
        warnings.push(`Exporter_Contact_Person_1 is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Exporter_Contact_Person_2))
        warnings.push(`Exporter_Contact_Person_2 is missing at row number ${row_number}`);
    return { errors, warnings };
}
exports.validateExportDataRow = validateExportDataRow;
//# sourceMappingURL=validate.js.map