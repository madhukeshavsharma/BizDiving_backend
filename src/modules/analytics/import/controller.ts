import {Request, Response} from 'express';
import {HttpResponse} from '../../../handlers/HttpResponse';
import {processImportData} from './utils/processor';

import InternalServerException from '../../../handlers/InternalServerException';
import {IDynamicSearchImportParams, IExcelImport} from './types';
import {readExcel} from '../../../utilities/parser';
import {
  batchInsertImportData,
  batchInsertImporterDetails,
  batchInsertSupplierDetails,
  dynamicImportSearch,
  search_import,
} from './model';
import {HttpException} from '../../../handlers/HttpException';
import {getTransaction} from '../../../data/knex';
import {logger} from '../../../utilities/logger/winston_logger';

export async function uploadImportData(req: Request, res: Response) {
  try {
    const import_data: IExcelImport[] = await readExcel(
      'ALL INDIA IMPORT CH 30 DEC21.xlsx'
    );
    const {
      formated_import_data,
      supplier_details,
      importer_details,
      import_warnings,
    } = await processImportData(import_data);

    const trx = await getTransaction();
    try {
      logger.info('STARTING BATCH INSERTION FOR IMPORT RECORDS');
      await batchInsertImportData(trx, formated_import_data, 1000);
      logger.info('BATCH INSERTION COMPLETED FOR IMPORT RECORDS');

      logger.info('STARTING BATCH INSERTION FOR IMPORTER DETAILS RECORDS');
      await batchInsertImporterDetails(trx, importer_details, 1000);
      logger.info('BATCH INSERTION COMPLETED FOR IMPORTER DETAILS RECORDS');

      logger.info('STARTING BATCH INSERTION FOR SUPPLIER DETAILS RECORDS');
      await batchInsertSupplierDetails(trx, supplier_details, 1000);
      logger.info('BATCH INSERTION COMPLETED FOR SUPPLIER DETAILS RECORDS');

      await trx.commit();
    } catch (error) {
      await trx.rollback();
    }

    return HttpResponse(
      res,
      200,
      `${formated_import_data.length} records inserted`,
      {
        warnings: import_warnings.length,
        import_warnings,
      }
    );
  } catch (error) {
    return InternalServerException(res, error);
  }
}

export async function searchImportData(req: Request, res: Response) {
  try {
    const validation = search_import.validate(req.body);
    if (validation.error)
      throw new HttpException(
        400,
        1002,
        validation.error.details[0].message,
        {}
      );
    const validated_req = validation.value as IDynamicSearchImportParams;
    const searchResult = await dynamicImportSearch({
      search_text: validated_req.search_text,
      filter: validated_req.filter,
      pagination: validated_req.pagination,
      duration: validated_req.duration,
    });
    return HttpResponse(res, 200, 'records fetched successfully', searchResult);
  } catch (error) {
    return InternalServerException(res, error);
  }
}

// "hshCode":”------”,
// "companyName":”----”,
// "type":””,
// "Country":”----”,
// "buyerName":”-----”,
// "supplier_name":”------”,
// "portCode":””,
// "uqc":””,
