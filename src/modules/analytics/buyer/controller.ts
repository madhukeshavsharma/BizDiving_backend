import {Request, Response} from 'express';
import {HttpResponse} from '../../../handlers/HttpResponse';
import {processBuyerData} from './utils/processor';
import InternalServerException from '../../../handlers/InternalServerException';
import {IDynamicSearchBuyerParams, IExcelBuyer} from './types';
import {readExcel} from '../../../utilities/parser';
import {batchInsertBuyerData, dynamicBuyerSearch, search_buyer} from './model';
import {getTransaction} from '../../../data/knex';
import {logger} from '../../../utilities/logger/winston_logger';
import {HttpException} from '../../../handlers/HttpException';

export async function uploadBuyerData(req: Request, res: Response) {
  try {
    const import_data: IExcelBuyer[] = await readExcel(
      'Ch-30 Buyers Contact Details.xlsx'
    );
    const {formated_buyer_data, buyer_warnings} = await processBuyerData(
      import_data
    );

    const trx = await getTransaction();
    try {
      logger.info('STARTING BATCH INSERTION FOR BUYER RECORDS');
      await batchInsertBuyerData(trx, formated_buyer_data, 1000);
      logger.info('BATCH INSERTION COMPLETED FOR BUYER RECORDS');

      await trx.commit();
    } catch (error) {
      await trx.rollback();
    }

    return HttpResponse(
      res,
      200,
      `${formated_buyer_data.length} records inserted`,
      {
        warnings: buyer_warnings.length,
        buyer_warnings,
      }
    );
  } catch (error) {
    return InternalServerException(res, error);
  }
}

export async function searchBuyerData(req: Request, res: Response) {
  try {
    const validation = search_buyer.validate(req.body);
    if (validation.error)
      throw new HttpException(
        400,
        1002,
        validation.error.details[0].message,
        {}
      );
    const validated_req = validation.value as IDynamicSearchBuyerParams;
    const searchResult = await dynamicBuyerSearch({
      search_text: validated_req.search_text,
      filter: validated_req.filter,
      pagination: validated_req.pagination,
    });
    return HttpResponse(res, 200, 'records fetched successfully', searchResult);
  } catch (error) {
    return InternalServerException(res, error);
  }
}
