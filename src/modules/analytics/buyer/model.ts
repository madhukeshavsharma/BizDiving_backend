import {DB} from '../../../data/knex';
import {Knex} from 'knex';
import {IBuyer, IDynamicSearchBuyerParams} from './types';
import {logger} from '../../../utilities/logger/winston_logger';
import Joi from 'joi';
const JoiDate = require('joi').extend(require('@joi/date'));

export const search_buyer_filter = Joi.object({
  company_name: Joi.string().max(255).allow(''),
  contact_person: Joi.string().max(255).allow(''),
  designation: Joi.string().max(255).allow(''),
  email_id: Joi.string().max(255).allow(''),
  contact_no: Joi.string().max(255).allow(''),
  address: Joi.string().max(255).allow(''),
  country: Joi.string().max(255).allow(''),
});

export const pagination = Joi.object({
  page_index: Joi.number().required(),
  page_size: Joi.number().required(),
});

export const duration = Joi.object({
  start_date: JoiDate.date().format('YYYY-MM-DD').raw().required(),
  end_date: JoiDate.date().format('YYYY-MM-DD').raw().required(),
});

export const search_buyer = Joi.object({
  search_text: Joi.string().min(3).max(70),
  filter: search_buyer_filter,
  pagination: pagination,
  duration: duration,
});

export async function batchInsertBuyerData(
  trx: Knex.Transaction,
  insertRows: IBuyer[],
  batchSize: number
): Promise<boolean> {
  try {
    const data: {id: number}[] = await DB.write
      .batchInsert('buyer', insertRows, batchSize)
      .returning('id')
      .transacting(trx);

    logger.info(`TOTAL RECORDS INSERTED IN BUYER TABLE: ${data.length}`);
    // logger.info(JSON.stringify(data));
    return true;
  } catch (error) {
    logger.error('ERROR RASIED WHILE BATCH INSERTION IN BUYER TABLE');
    throw error;
  }
}

export async function dynamicBuyerSearch(params: IDynamicSearchBuyerParams) {
  let DBQuery = DB.read.from('buyer');

  if (params.filter) {
    if (params.filter.company_name) {
      DBQuery = DBQuery.where('company_name', params.filter.company_name);
    }
    if (params.filter.contact_person) {
      DBQuery = DBQuery.where('contact_person', params.filter.contact_person);
    }
    if (params.filter.designation) {
      DBQuery = DBQuery.where('designation', params.filter.designation);
    }
    if (params.filter.email_id) {
      DBQuery = DBQuery.where('email_id', params.filter.email_id);
    }
    if (params.filter.contact_no) {
      DBQuery = DBQuery.where('contact_no', params.filter.contact_no);
    }
    if (params.filter.address) {
      DBQuery = DBQuery.where('address', params.filter.address);
    }
    if (params.filter.country) {
      DBQuery = DBQuery.where('country', params.filter.country);
    }
  }

  if (params.search_text) {
    logger.info(
      `SEARCHING IN BUYER DATA WITH SEARCH TEXT ${params.search_text}`
    );
    if (params.filter) {
      if (params.filter.company_name) {
        DBQuery = DBQuery.whereLike(
          'company_name',
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
  // console.log('BUYER SEARCH QUERY: ', DBQuery.toSQL().toNative());
  const records = await DBQuery.clone().select('*');

  return {
    total_records: total_records[0].count,
    records,
  };
}
