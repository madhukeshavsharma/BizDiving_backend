import {HttpException} from '../../../handlers/HttpException';
import {Request, Response} from 'express';
import {HttpResponse} from '../../../handlers/HttpResponse';
import InternalServerException from '../../../handlers/InternalServerException';
import {readExcel} from '../../../utilities/parser';
import {
  batchInsertBuyerDetails,
  batchInsertExportData,
  batchInsertExporterDetails,
  dynamicExportSearch,
  search_export,
} from './model';
import {IDynamicSearchExportParams, IExcelExport} from './type';

import {processExportData} from './utils/processor';
import {logger} from '../../../utilities/logger/winston_logger';
import {getTransaction} from '../../../data/knex';

export async function uploadExportData(req: Request, res: Response) {
  try {
    const export_data: IExcelExport[] = await readExcel(
      'ALL INDIA EXPORT CH 30 DEC21.xlsx'
    );

    const {
      formated_export_data,
      exporter_details,
      buyer_details,
      export_warnings,
    } = await processExportData(export_data);

    const trx = await getTransaction();
    try {
      logger.info('STARTING BATCH INSERTION FOR EXPORT RECORDS');
      await batchInsertExportData(trx, formated_export_data, 1000);
      logger.info('BATCH INSERTION COMPLETED FOR EXPORT RECORDS');

      logger.info('STARTING BATCH INSERTION FOR EXPORTER DETAILS RECORDS');
      await batchInsertExporterDetails(trx, exporter_details, 1000);
      logger.info('BATCH INSERTION COMPLETED FOR EXPORTER DETAILS RECORDS');

      logger.info('STARTING BATCH INSERTION FOR BUYER DETAILS RECORDS');
      await batchInsertBuyerDetails(trx, buyer_details, 1000);
      logger.info('BATCH INSERTION COMPLETED FOR BUYER DETAILS RECORDS');
      await trx.commit();
    } catch (error) {}
    return HttpResponse(
      res,
      200,
      `${formated_export_data.length} records inserted`,
      {
        warnings: export_warnings.length,
        export_warnings,
      }
    );
  } catch (error) {
    return InternalServerException(res, error);
  }
}

export async function searchExportData(req: Request, res: Response) {
  try {
    const validation = search_export.validate(req.body);
    if (validation.error)
      throw new HttpException(
        400,
        1002,
        validation.error.details[0].message,
        {}
      );
    const validated_req = validation.value as IDynamicSearchExportParams;
    const searchResult = await dynamicExportSearch({
      search_text: validated_req.search_text,
      filter: validated_req.filter,
      pagination: validated_req.pagination,
      duration: validated_req.duration,
    });
    return HttpResponse(res, 200, `records fetched successfully`, searchResult);
  } catch (error) {
    return InternalServerException(res, error);
  }
}
