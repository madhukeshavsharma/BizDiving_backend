import {DB} from '../../../data/knex';
import {Knex} from 'knex';
import {logger} from '../../../utilities/logger/winston_logger';
import Joi from 'joi';
import {
  IBuyerDetails,
  IDynamicSearchExportParams,
  IExport,
  IExporterDetails,
} from './type';
const JoiDate = require('joi').extend(require('@joi/date'));

export const search_export_filter = Joi.object({
  type: Joi.string().max(50).allow(''),
  sbill_no: Joi.string().max(100).allow(''),
  sbill_date: Joi.string().max(100).allow(''),
  port_of_loading: Joi.string().max(255).allow(''),
  mode_of_shipment: Joi.string().max(100).allow(''),
  port_code: Joi.string().max(100).allow(''),
  month: JoiDate.date().format('YYYY-MM-DD').raw(),
  hs_code: Joi.string().max(255).allow(''),
  item_description: Joi.string().max(255).allow(''),
  quantity: Joi.number().allow(''),
  uqc: Joi.string().max(100).allow(''),
  unit_rate_in_fc: Joi.number().allow(''),
  currency: Joi.string().max(100).allow(''),
  unit_value_in_inr: Joi.number().allow(''),
  total_fob_value_in_inr: Joi.number().allow(''),
  invoice_no: Joi.string().max(255).allow(''),
  port_of_discharge: Joi.string().max(255).allow(''),
  country: Joi.string().max(255).allow(''),
  buyer_name: Joi.string().max(255).allow(''),
  buyer_address: Joi.string().max(255).allow(''),
  iec: Joi.string().max(255).allow(''),
  exporter_name: Joi.string().max(255).allow(''),
  exporter_address: Joi.string().max(255).allow(''),
  exporter_city_state: Joi.string().max(255).allow(''),
  exporter_pin: Joi.string().max(100).allow(''),
  exporter_phone: Joi.string().max(255).allow(''),
  exporter_mail: Joi.string().max(100).allow(''),
  exporter_contact_person_1: Joi.string().max(255).allow(''),
  exporter_contact_person_2: Joi.string().max(255).allow(''),
});

export const pagination = Joi.object({
  page_index: Joi.number().required(),
  page_size: Joi.number().required(),
});

export const duration = Joi.object({
  start_date: JoiDate.date().format('YYYY-MM-DD').raw().required(),
  end_date: JoiDate.date().format('YYYY-MM-DD').raw().required(),
});

export const search_export = Joi.object({
  search_text: Joi.string().min(3).max(70),
  filter: search_export_filter,
  pagination: pagination,
  duration: duration,
});

export async function batchInsertExportData(
  trx: Knex.Transaction,
  insertRows: IExport[],
  batchSize: number
): Promise<boolean> {
  try {
    const data: {id: number}[] = await DB.write
      .batchInsert('export', insertRows, batchSize)
      .returning('id')
      .transacting(trx);

    logger.info(`TOTAL RECORDS INSERTED IN EXPORT TABLE: ${data.length}`);
    // logger.info(JSON.stringify(data));
    return true;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function batchInsertExporterData(
  trx: Knex.Transaction,
  insertRows: IExport[],
  batchSize: number
): Promise<boolean> {
  try {
    const data: {id: number}[] = await DB.write
      .batchInsert('exporter_details', insertRows, batchSize)
      .returning('id')
      .transacting(trx);

    logger.info(
      `TOTAL RECORDS INSERTED IN exporter_details TABLE: ${data.length}`
    );
    // logger.info(JSON.stringify(data));
    return true;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function batchInsertExporterDetails(
  trx: Knex.Transaction,
  insertRows: IExporterDetails[],
  batchSize: number
): Promise<boolean> {
  try {
    const data: {id: number}[] = await DB.write
      .batchInsert('exporter_details', insertRows, batchSize)
      .returning('id')
      .transacting(trx);

    logger.info(
      `TOTAL RECORDS INSERTED IN exporter_details TABLE: ${data.length}`
    );
    // logger.info(JSON.stringify(data));
    return true;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function batchInsertBuyerDetails(
  trx: Knex.Transaction,
  insertRows: IBuyerDetails[],
  batchSize: number
): Promise<boolean> {
  try {
    const data: {id: number}[] = await DB.write
      .batchInsert('buyer_details', insertRows, batchSize)
      .returning('id')
      .transacting(trx);

    logger.info(
      `TOTAL RECORDS INSERTED IN buyer_details TABLE: ${data.length}`
    );
    // logger.info(JSON.stringify(data));
    return true;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function dynamicExportSearch(params: IDynamicSearchExportParams) {
  let DBQuery = DB.read.from('export');

  if (params.duration) {
    DBQuery = DBQuery.whereRaw(
      `month between '${params.duration.start_date}' and '${params.duration.end_date}'`
    );
  }

  if (params.filter) {
    if (params.filter.type) {
      DBQuery = DBQuery.where('type', params.filter.type);
    }
    if (params.filter.sbill_no) {
      DBQuery = DBQuery.where('sbill_no', params.filter.sbill_no);
    }
    if (params.filter.sbill_date) {
      DBQuery = DBQuery.where('sbill_date', params.filter.sbill_date);
    }
    if (params.filter.port_of_loading) {
      DBQuery = DBQuery.where('port_of_loading', params.filter.port_of_loading);
    }
    if (params.filter.mode_of_shipment) {
      DBQuery = DBQuery.where(
        'mode_of_shipment',
        params.filter.mode_of_shipment
      );
    }
    if (params.filter.port_code) {
      DBQuery = DBQuery.where('port_code', params.filter.port_code);
    }
    if (params.filter.month) {
      DBQuery = DBQuery.where('month', params.filter.month);
    }
    if (params.filter.hs_code) {
      DBQuery = DBQuery.where('hs_code', params.filter.hs_code);
    }

    if (params.filter.quantity) {
      DBQuery = DBQuery.where('quantity', params.filter.quantity);
    }

    if (params.filter.uqc) {
      DBQuery = DBQuery.where('uqc', params.filter.uqc);
    }
    if (params.filter.unit_rate_in_fc) {
      DBQuery = DBQuery.where('unit_rate_in_fc', params.filter.unit_rate_in_fc);
    }
    if (params.filter.currency) {
      DBQuery = DBQuery.where('currency', params.filter.currency);
    }

    if (params.filter.unit_value_in_inr) {
      DBQuery = DBQuery.where(
        'unit_value_in_inr',
        params.filter.unit_value_in_inr
      );
    }

    if (params.filter.total_fob_value_in_inr) {
      DBQuery = DBQuery.where(
        'total_fob_value_in_inr',
        params.filter.total_fob_value_in_inr
      );
    }

    if (params.filter.invoice_no) {
      DBQuery = DBQuery.where('invoice_no', params.filter.invoice_no);
    }

    if (params.filter.port_of_discharge) {
      DBQuery = DBQuery.where(
        'port_of_discharge',
        params.filter.port_of_discharge
      );
    }

    if (params.filter.country) {
      DBQuery = DBQuery.where('country', params.filter.country);
    }

    if (params.filter.buyer_name) {
      DBQuery = DBQuery.where('buyer_name', params.filter.buyer_name);
    }

    if (params.filter.iec) {
      DBQuery = DBQuery.where('iec', params.filter.iec);
    }

    if (params.filter.exporter_name) {
      DBQuery = DBQuery.where('exporter_name', params.filter.exporter_name);
    }

    if (params.filter.exporter_city_state) {
      DBQuery = DBQuery.where(
        'exporter_city_state',
        params.filter.exporter_city_state
      );
    }

    if (params.filter.exporter_pin) {
      DBQuery = DBQuery.where('exporter_pin', params.filter.exporter_pin);
    }

    if (params.filter.exporter_phone) {
      DBQuery = DBQuery.where('exporter_phone', params.filter.exporter_phone);
    }

    if (params.filter.exporter_mail) {
      DBQuery = DBQuery.where('exporter_mail', params.filter.exporter_mail);
    }

    if (params.filter.exporter_contact_person_1) {
      DBQuery = DBQuery.where(
        'exporter_contact_person_1',
        params.filter.exporter_contact_person_1
      );
    }

    if (params.filter.exporter_contact_person_2) {
      DBQuery = DBQuery.where(
        'exporter_contact_person_2',
        params.filter.exporter_contact_person_2
      );
    }
  }

  if (params.search_text) {
    logger.info(
      `SEARCHING IN EXPORT DATA WITH SEARCH TEXT ${params.search_text}`
    );
    if (params.filter) {
      if (params.filter.hs_code) {
        DBQuery = DBQuery.whereLike('hs_code', `%${params.search_text || ''}%`);
      }

      if (params.filter.country) {
        DBQuery = DBQuery.whereLike('country', `%${params.search_text || ''}%`);
      }

      if (params.filter.exporter_name) {
        DBQuery = DBQuery.whereLike(
          'exporter_name',
          `%${params.search_text || ''}%`
        );
      }
    }
  }

  const total_records = await DBQuery.clone().count();
  logger.info(`FOUND ${total_records[0].count} SEARCH RESULT RECORDS`);

  if (params.pagination) {
    if (params.pagination.page_size) {
      const offset =
        (params.pagination.page_index || 0) * params.pagination.page_size;
      DBQuery = DBQuery.offset(offset).limit(params.pagination.page_size);
    }
  } else {
    DBQuery = DBQuery.offset(0).limit(20);
  }
  // console.log('EXPORT SEARCH QUERY: ', DBQuery.toSQL().toNative());
  const records = await DBQuery.clone().select('*');

  return {
    total_records: total_records[0].count,
    records,
  };
}
