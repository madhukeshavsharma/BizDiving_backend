import {HttpException} from '../../../../handlers/HttpException';
import {logger} from '../../../../utilities/logger/winston_logger';
import {IBuyerDetails, IExcelExport, IExport, IExporterDetails} from '../type';
import {validateExportDataRow} from './validate';

export async function processExportData(data: IExcelExport[]) {
  const formated_export_data: IExport[] = [];
  const export_errors: string[] = [];
  const export_warnings: string[] = [];
  const exporter_details: IExporterDetails[] = [];
  const buyer_details: IBuyerDetails[] = [];

  logger.info('FORMATING EXPORT DATA');

  for (let i = 0; i < data.length; i++) {
    const row: IExcelExport = data[i];

    const {errors, warnings} = validateExportDataRow(row, i);
    const formated_row = {
      type: row.Type?.toLowerCase(),
      sbill_no: row['Sbill No']?.toLowerCase(),
      sbill_date: row['Sbill Date']?.toLowerCase(),
      port_of_loading: row['Port of Loading']?.toLowerCase(),
      mode_of_shipment: row['Mode of Shipment']?.toLowerCase(),
      port_code: row['Port Code']?.toLowerCase(),
      month: row.Month,
      hs_code: row['HS Code']?.toLowerCase(),
      item_description: row['Item Description']?.toLowerCase(),
      quantity: +row.Quantity,
      uqc: row.UQC?.toLowerCase(),
      unit_rate_in_fc: +row['Unit Rate in FC']?.toLowerCase(),
      currency: row.Currency?.toLowerCase(),
      unit_value_in_inr: +row['Unit Value in INR'],
      total_fob_value_in_inr: +row['Total FOB Value in INR'],
      invoice_no: row['Invoice No']?.toLowerCase(),
      port_of_discharge: row['Port of Discharge']?.toLowerCase(),
      country: row.Country?.toLowerCase(),
      buyer_name: row['Buyer Name']?.toLowerCase(),
      buyer_address: row.Buyer_Address?.toLowerCase(),
      iec: row.IEC?.toLowerCase(),
      exporter_name: row['Exporter Name']?.toLowerCase(),
      exporter_address: row.Exporter_Address?.toLowerCase(),
      exporter_city_state: row.Exporter_City_State?.toLowerCase(),
      exporter_pin: row.Exporter_PIN?.toLowerCase(),
      exporter_phone: row.Exporter_Phone?.toLowerCase(),
      exporter_mail: row.Exporter_mail?.toLowerCase(),
      exporter_contact_person_1: row.Exporter_Contact_Person_1?.toLowerCase(),
      exporter_contact_person_2:
        row.Exporter_Contact_Person_2?.toLowerCase().replace(/^\s+|\s+$/g, ''),
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
  logger.info('FORMATING EXPORT DATA COMPLETED');
  return {
    formated_export_data,
    exporter_details,
    buyer_details,
    export_warnings,
  };
}
