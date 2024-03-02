"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImportData = void 0;
const winston_logger_1 = require("../../../../utilities/logger/winston_logger");
const validate_1 = require("./validate");
async function processImportData(data) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
    const formated_import_data = [];
    const import_errors = [];
    const import_warnings = [];
    const importer_details = [];
    const supplier_details = [];
    winston_logger_1.logger.info('FORMATING IMPORT DATA');
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const { errors, warnings } = (0, validate_1.validateImportDataRow)(row, i);
        if (errors.length > 0)
            import_errors.push(...errors);
        if (warnings.length > 0)
            import_warnings.push(...warnings);
        const formated_row = {
            type: (_a = row.Type) === null || _a === void 0 ? void 0 : _a.toLowerCase(),
            cush: (_b = row.CUSH) === null || _b === void 0 ? void 0 : _b.toLowerCase(),
            indian_port: (_c = row['Indian Port']) === null || _c === void 0 ? void 0 : _c.toLowerCase(),
            mode_of_shipment: (_d = row['Mode of Shipment']) === null || _d === void 0 ? void 0 : _d.toLowerCase(),
            be_no: (_e = row.BE_NO) === null || _e === void 0 ? void 0 : _e.toLowerCase(),
            be_date: (_f = row.BE_Date) === null || _f === void 0 ? void 0 : _f.toLowerCase(),
            be_type: (_g = row.BE_Type) === null || _g === void 0 ? void 0 : _g.toLowerCase(),
            month: row.Month,
            cth_hscode: (_h = row.CTH_HSCODE) === null || _h === void 0 ? void 0 : _h.toLowerCase(),
            country_of_origin: (_j = row.Country_of_Origin) === null || _j === void 0 ? void 0 : _j.toLowerCase(),
            item_description: (_k = row.Item_Description) === null || _k === void 0 ? void 0 : _k.toLowerCase(),
            invoice_currency: (_l = row.INVOICE_CURRENCY) === null || _l === void 0 ? void 0 : _l.toLowerCase(),
            invoice_unit_price_fc: +((_m = row.Invoice_Unit_Price_FC) === null || _m === void 0 ? void 0 : _m.toLowerCase()),
            quantity: +row.Quantity,
            uqc: (_o = row.UQC) === null || _o === void 0 ? void 0 : _o.toLowerCase(),
            unit_price: +row.Unit_Price,
            total_ass_value: +(row === null || row === void 0 ? void 0 : row.TOTAL_ASS_VALUE),
            total_duty_paid: +(row === null || row === void 0 ? void 0 : row.Total_Duty_Paid),
            cha_name: (_p = row.CHA_Name) === null || _p === void 0 ? void 0 : _p.toLowerCase(),
            iec: (_q = row.IEC) === null || _q === void 0 ? void 0 : _q.toLowerCase(),
            importer_name: (_r = row.Importer_Name) === null || _r === void 0 ? void 0 : _r.toLowerCase(),
            port_of_shipment: (_s = row.Port_of_Shipment) === null || _s === void 0 ? void 0 : _s.toLowerCase(),
            supplier_name: (_t = row.Supplier_Name) === null || _t === void 0 ? void 0 : _t.toLowerCase(),
            supplier_address: (_u = row.Supplier_Address) === null || _u === void 0 ? void 0 : _u.toLowerCase(),
            importer_address: (_v = row.Importer_Address) === null || _v === void 0 ? void 0 : _v.toLowerCase(),
            importer_city_state: (_w = row.Importer_City_State) === null || _w === void 0 ? void 0 : _w.toLowerCase(),
            importer_pin: (_x = row.Importer_PIN) === null || _x === void 0 ? void 0 : _x.toLowerCase(),
            importer_phone: (_y = row.Importer_Phone) === null || _y === void 0 ? void 0 : _y.toLowerCase(),
            importer_mail: (_z = row.Importer_Mail) === null || _z === void 0 ? void 0 : _z.toLowerCase(),
            importer_contact_person_1: (_0 = row.Importer_Contact_Person_1) === null || _0 === void 0 ? void 0 : _0.toLowerCase(),
            importer_contact_person_2: (_1 = row.Importer_Contact_Person_2) === null || _1 === void 0 ? void 0 : _1.toLowerCase().replace(/^\s+|\s+$/g, ''),
        };
        const importer = {
            importer_name: formated_row.importer_name,
            importer_address: formated_row.importer_address,
            importer_city_state: formated_row.importer_city_state,
            importer_pin: formated_row.importer_pin,
            importer_phone: formated_row.importer_phone,
            importer_mail: formated_row.importer_mail,
            importer_contact_person_1: formated_row.importer_contact_person_1,
            importer_contact_person_2: formated_row.importer_contact_person_2,
        };
        const supplier = {
            supplier_name: formated_row.supplier_name,
            supplier_address: formated_row.supplier_address,
        };
        //undefined is returned if any of the rows does not contain a value
        formated_import_data.push(formated_row);
        supplier_details.push(supplier);
        importer_details.push(importer);
        // if (import_errors.length >= 50) {
        //   logger.error('EXCEL ERRORS ' + import_errors);
        //   throw new HttpException(400, 1202, 'Invalid Data found in excel', {
        //     errors: import_errors.length,
        //     warning: import_warnings.length,
        //     import_errors,
        //     import_warnings,
        //   });
        // }
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
    winston_logger_1.logger.info('FORMATING IMPORT DATA COMPLETED');
    return {
        formated_import_data,
        supplier_details,
        importer_details,
        import_warnings,
    };
}
exports.processImportData = processImportData;
//# sourceMappingURL=processor.js.map