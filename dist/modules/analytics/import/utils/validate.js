"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateImportDataRow = void 0;
const helper_1 = require("../../../../utilities/helper");
function validateImportDataRow(row, row_number) {
    //columns headers take 1 row and array start from 0 index
    row_number = row_number + 2;
    const errors = [];
    const warnings = [];
    if ((0, helper_1.isEmpty)(row.Type))
        errors.push(`Type is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.CUSH))
        errors.push(`CUSH is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row['Indian Port']))
        errors.push(`Indian Port is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row['Mode of Shipment']))
        errors.push(`Mode of Shipment is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.BE_NO))
        errors.push(`BE_NO is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Month))
        errors.push(`Month is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.CTH_HSCODE))
        errors.push(`CTH_HSCODE is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Country_of_Origin))
        errors.push(`Country_of_Origin is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Item_Description))
        errors.push(`Item_Description is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.INVOICE_CURRENCY))
        errors.push(`INVOICE_CURRENCY is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Invoice_Unit_Price_FC))
        errors.push(`Invoice_Unit_Price_FC is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Quantity))
        errors.push(`Quantity is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.UQC))
        errors.push(`UQC is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Unit_Price))
        errors.push(`Unit_Price is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.TOTAL_ASS_VALUE))
        errors.push(`TOTAL_ASS_VALUE is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Total_Duty_Paid))
        errors.push(`Total_Duty_Paid is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.CHA_Name))
        errors.push(`CHA_Name is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.IEC))
        errors.push(`IEC is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Importer_Name))
        errors.push(`Importer_Name is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Port_of_Shipment))
        errors.push(`Port_of_Shipment is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Supplier_Name))
        errors.push(`Supplier_Name is missating at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Supplier_Address))
        errors.push(`Supplier_Address is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Importer_Address))
        errors.push(`Importer_Address is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Importer_City_State))
        errors.push(`Importer_City_State is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Importer_PIN))
        errors.push(`Importer_PIN is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Importer_Phone))
        errors.push(`Importer_Phone is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Importer_Mail))
        errors.push(`Importer_Mail is missing at row number ${row_number}`);
    if ((0, helper_1.isEmpty)(row.Importer_Contact_Person_1))
        errors.push(`Importer_Contact_Person_1 is missing at row number ${row_number}`);
    // if (isEmpty(row.Importer_Contact_Person_2))
    //   warnings.push(
    //     `Importer_Contact_Person_2 is missing at row number ${row_number}`
    //   );
    return { errors, warnings };
}
exports.validateImportDataRow = validateImportDataRow;
//# sourceMappingURL=validate.js.map