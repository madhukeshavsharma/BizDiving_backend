import {isEmpty} from '../../../../utilities/helper';
import {IExcelBuyer} from '../types';

export function validateBuyerDataRow(row: IExcelBuyer, row_number: number) {
  //columns headers take 1 row and array start from 0 index
  row_number = row_number + 2;

  const errors: string[] = [];
  const warnings: string[] = [];
  if (isEmpty(row['Company Name']))
    warnings.push(`Company Name is missing at row number ${row_number}`);
  if (isEmpty(row['Contact Person']))
    warnings.push(`Contact Person is missing at row number ${row_number}`);
  if (isEmpty(row.Designation))
    warnings.push(`Designation is missing at row number ${row_number}`);
  if (isEmpty(row['Email Id']))
    warnings.push(`Email Id is missing at row number ${row_number}`);
  if (isEmpty(row['Contact No']))
    warnings.push(`Contact No is missing at row number ${row_number}`);
  if (isEmpty(row.Address))
    warnings.push(`Address is missing at row number ${row_number}`);
  if (isEmpty(row.Country))
    warnings.push(`Country is missing at row number ${row_number}`);

  return {errors, warnings};
}
