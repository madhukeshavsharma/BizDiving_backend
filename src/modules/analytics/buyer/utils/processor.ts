import {IExcelBuyer, IBuyer} from '../types';
import {logger} from '../../../../utilities/logger/winston_logger';
import {validateBuyerDataRow} from './validate';

export async function processBuyerData(data: IExcelBuyer[]) {
  const formated_buyer_data: IBuyer[] = [];
  const buyer_errors: string[] = [];
  const buyer_warnings: string[] = [];

  logger.info('FORMATING BUYER DATA');

  for (let i = 0; i < data.length; i++) {
    const row: IExcelBuyer = data[i];

    const {errors, warnings} = validateBuyerDataRow(row, i);

    if (errors.length > 0) buyer_errors.push(...errors);
    if (warnings.length > 0) buyer_warnings.push(...warnings);

    const formated_row = {
      company_name: row['Company Name']?.toLowerCase(),
      contact_person: row['Contact Person']?.toLowerCase(),
      designation: row.Designation?.toLowerCase(),
      email_id: row['Email Id']?.toLowerCase(),
      contact_no: row['Contact No']?.toLowerCase(),
      address: row.Address?.toLowerCase(),
      country: row.Country?.toLowerCase(),
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
  logger.info('FORMATING BUYER DATA COMPLETED');
  return {
    formated_buyer_data,
    buyer_warnings,
  };
}
