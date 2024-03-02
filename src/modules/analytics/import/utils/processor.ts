import {
  IExcelImport,
  IImport,
  IImporterDetails,
  ISupplierDetails,
} from '../types';
import {logger} from '../../../../utilities/logger/winston_logger';
import {validateImportDataRow} from './validate';

export async function processImportData(data: IExcelImport[]) {
  const formated_import_data: IImport[] = [];
  const import_errors: string[] = [];
  const import_warnings: string[] = [];
  const importer_details: IImporterDetails[] = [];
  const supplier_details: ISupplierDetails[] = [];

  logger.info('FORMATING IMPORT DATA');

  for (let i = 0; i < data.length; i++) {
    const row: IExcelImport = data[i];

    const {errors, warnings} = validateImportDataRow(row, i);

    if (errors.length > 0) import_errors.push(...errors);
    if (warnings.length > 0) import_warnings.push(...warnings);

    const formated_row = {
      type: row.Type?.toLowerCase(),
      cush: row.CUSH?.toLowerCase(),
      indian_port: row['Indian Port']?.toLowerCase(),
      mode_of_shipment: row['Mode of Shipment']?.toLowerCase(),
      be_no: row.BE_NO?.toLowerCase(),
      be_date: row.BE_Date?.toLowerCase(),
      be_type: row.BE_Type?.toLowerCase(),
      month: row.Month,
      cth_hscode: row.CTH_HSCODE?.toLowerCase(),
      country_of_origin: row.Country_of_Origin?.toLowerCase(),
      item_description: row.Item_Description?.toLowerCase(),
      invoice_currency: row.INVOICE_CURRENCY?.toLowerCase(),
      invoice_unit_price_fc: +row.Invoice_Unit_Price_FC?.toLowerCase(),
      quantity: +row.Quantity,
      uqc: row.UQC?.toLowerCase(),
      unit_price: +row.Unit_Price,
      total_ass_value: +row?.TOTAL_ASS_VALUE,
      total_duty_paid: +row?.Total_Duty_Paid,
      cha_name: row.CHA_Name?.toLowerCase(),
      iec: row.IEC?.toLowerCase(),
      importer_name: row.Importer_Name?.toLowerCase(),
      port_of_shipment: row.Port_of_Shipment?.toLowerCase(),
      supplier_name: row.Supplier_Name?.toLowerCase(),
      supplier_address: row.Supplier_Address?.toLowerCase(),
      importer_address: row.Importer_Address?.toLowerCase(),
      importer_city_state: row.Importer_City_State?.toLowerCase(),
      importer_pin: row.Importer_PIN?.toLowerCase(),
      importer_phone: row.Importer_Phone?.toLowerCase(),
      importer_mail: row.Importer_Mail?.toLowerCase(),
      importer_contact_person_1: row.Importer_Contact_Person_1?.toLowerCase(),
      importer_contact_person_2:
        row.Importer_Contact_Person_2?.toLowerCase().replace(/^\s+|\s+$/g, ''),
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
  logger.info('FORMATING IMPORT DATA COMPLETED');
  return {
    formated_import_data,
    supplier_details,
    importer_details,
    import_warnings,
  };
}

//Exporter new columns

// Shipment ID
// Date
// Port of Loading
// Mode of Shipment
// Month
// HS Code
// Product Description
// Quantity
// Unit Quantity Code
// Unit Rate in FC
// Currency
// Unit Value USD
// Total Value USD
// Port of Discharge
// Country of Destination
// Importer Name
// Importer Address
// IEC
// Exporter Name
// Exporter Address
// Exporter City State
// Exporter PIN
// Exporter Phone
// Exporter Mail
// Exporter Contact Person 1
// Exporter Contact Person 2

//Import new columns
// Port of Discharge/ Port Code
// Mode of Shipment
// Shipment ID
// Date
// BE Type
// AG
// Month
// HS CODE
// Country of Origin
// Product Description
// INVOICE CURRENCY
// Invoice Unit Price FC
// Quantity
// Unit Quantity Code
// Unit Price USD
// Total Value USD
// Total Duty USD
// CHA Name
// IEC
// Importer Name
// Port of Loading
// Exporter Name
// Exporter Address
// Importer Address
// Importer City State
// Importer PIN
// Importer Phone
// Importer Mail
// Importer Contact Person 1
// Importer Contact Person 2
