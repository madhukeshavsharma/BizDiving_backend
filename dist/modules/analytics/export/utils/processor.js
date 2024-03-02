"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processExportData = void 0;
const winston_logger_1 = require("../../../../utilities/logger/winston_logger");
const validate_1 = require("./validate");
async function processExportData(data) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
    const formated_export_data = [];
    const export_errors = [];
    const export_warnings = [];
    const exporter_details = [];
    const buyer_details = [];
    winston_logger_1.logger.info('FORMATING EXPORT DATA');
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const { errors, warnings } = (0, validate_1.validateExportDataRow)(row, i);
        const formated_row = {
            type: (_a = row.Type) === null || _a === void 0 ? void 0 : _a.toLowerCase(),
            sbill_no: (_b = row['Sbill No']) === null || _b === void 0 ? void 0 : _b.toLowerCase(),
            sbill_date: (_c = row['Sbill Date']) === null || _c === void 0 ? void 0 : _c.toLowerCase(),
            port_of_loading: (_d = row['Port of Loading']) === null || _d === void 0 ? void 0 : _d.toLowerCase(),
            mode_of_shipment: (_e = row['Mode of Shipment']) === null || _e === void 0 ? void 0 : _e.toLowerCase(),
            port_code: (_f = row['Port Code']) === null || _f === void 0 ? void 0 : _f.toLowerCase(),
            month: row.Month,
            hs_code: (_g = row['HS Code']) === null || _g === void 0 ? void 0 : _g.toLowerCase(),
            item_description: (_h = row['Item Description']) === null || _h === void 0 ? void 0 : _h.toLowerCase(),
            quantity: +row.Quantity,
            uqc: (_j = row.UQC) === null || _j === void 0 ? void 0 : _j.toLowerCase(),
            unit_rate_in_fc: +((_k = row['Unit Rate in FC']) === null || _k === void 0 ? void 0 : _k.toLowerCase()),
            currency: (_l = row.Currency) === null || _l === void 0 ? void 0 : _l.toLowerCase(),
            unit_value_in_inr: +row['Unit Value in INR'],
            total_fob_value_in_inr: +row['Total FOB Value in INR'],
            invoice_no: (_m = row['Invoice No']) === null || _m === void 0 ? void 0 : _m.toLowerCase(),
            port_of_discharge: (_o = row['Port of Discharge']) === null || _o === void 0 ? void 0 : _o.toLowerCase(),
            country: (_p = row.Country) === null || _p === void 0 ? void 0 : _p.toLowerCase(),
            buyer_name: (_q = row['Buyer Name']) === null || _q === void 0 ? void 0 : _q.toLowerCase(),
            buyer_address: (_r = row.Buyer_Address) === null || _r === void 0 ? void 0 : _r.toLowerCase(),
            iec: (_s = row.IEC) === null || _s === void 0 ? void 0 : _s.toLowerCase(),
            exporter_name: (_t = row['Exporter Name']) === null || _t === void 0 ? void 0 : _t.toLowerCase(),
            exporter_address: (_u = row.Exporter_Address) === null || _u === void 0 ? void 0 : _u.toLowerCase(),
            exporter_city_state: (_v = row.Exporter_City_State) === null || _v === void 0 ? void 0 : _v.toLowerCase(),
            exporter_pin: (_w = row.Exporter_PIN) === null || _w === void 0 ? void 0 : _w.toLowerCase(),
            exporter_phone: (_x = row.Exporter_Phone) === null || _x === void 0 ? void 0 : _x.toLowerCase(),
            exporter_mail: (_y = row.Exporter_mail) === null || _y === void 0 ? void 0 : _y.toLowerCase(),
            exporter_contact_person_1: (_z = row.Exporter_Contact_Person_1) === null || _z === void 0 ? void 0 : _z.toLowerCase(),
            exporter_contact_person_2: (_0 = row.Exporter_Contact_Person_2) === null || _0 === void 0 ? void 0 : _0.toLowerCase().replace(/^\s+|\s+$/g, ''),
        };
        const exporter = {
            exporter_name: formated_row.exporter_name,
            exporter_address: formated_row.exporter_address,
            exporter_city_state: formated_row.exporter_city_state,
            exporter_pin: formated_row.exporter_pin,
            exporter_phone: formated_row.exporter_phone,
            exporter_mail: formated_row.exporter_mail,
            exporter_contact_person_1: formated_row.exporter_contact_person_1,
            exporter_contact_person_2: formated_row.exporter_contact_person_2,
        };
        const buyer = {
            buyer_name: formated_row.buyer_name,
            buyer_address: formated_row.buyer_address,
        };
        // if (errors.length > 0) export_errors.push(...errors);
        // if (warnings.length > 0) export_warnings.push(...warnings);
        //undefined is returned if any of the rows does not contain a value
        formated_export_data.push(formated_row);
        exporter_details.push(exporter);
        buyer_details.push(buyer);
        // if (export_errors.length >= 50) {
        //   logger.error('EXCEL ERRORS ' + export_errors);
        //   throw new HttpException(400, 1202, 'Invalid Data found in excel', {
        //     errors: export_errors.length,
        //     warning: export_warnings.length,
        //     export_errors,
        //     export_warnings,
        //   });
        // }
    }
    // if (export_errors.length > 0) {
    //   logger.error('EXCEL ERRORS ' + export_errors);
    //   throw new HttpException(400, 1202, 'Invalid Data found in excel', {
    //     errors: export_errors.length,
    //     warning: export_warnings.length,
    //     export_errors,
    //     export_warnings,
    //   });
    // }
    winston_logger_1.logger.info('FORMATING EXPORT DATA COMPLETED');
    return {
        formated_export_data,
        exporter_details,
        buyer_details,
        export_warnings,
    };
}
exports.processExportData = processExportData;
//# sourceMappingURL=processor.js.map