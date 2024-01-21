import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`

    CREATE SEQUENCE IF NOT EXISTS import_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

    CREATE TABLE IF NOT EXISTS import
    (
      id bigint NOT NULL DEFAULT nextval('import_id_seq'::regclass),
      type character varying(50) NOT NULL,
      cush character varying(255) NOT NULL,
      indian_port character varying(255) NOT NULL,
      mode_of_shipment character varying(100) NOT NULL,
      be_no character varying(255) NOT NULL,
      be_date character varying(50) NOT NULL,
      be_type character varying(50) NOT NULL,
      month date NOT NULL,
      cth_hscode character varying(255) NOT NULL,
      country_of_origin character varying(255) NOT NULL,
      item_description character varying(255) NOT NULL,
      invoice_currency character varying(100) NOT NULL,
      invoice_unit_price_fc float NOT NULL,
      quantity float NOT NULL,
      uqc character varying(100) NOT NULL,
      unit_price float NOT NULL,
      total_ass_value float NOT NULL,
      total_duty_paid float NOT NULL,
      cha_name character varying(255),
      iec character varying(255) NOT NULL,
      importer_name character varying(255) NOT NULL,
      port_of_shipment character varying(255) NOT NULL,
      supplier_name character varying(255) NOT NULL,
      supplier_address character varying(255) NOT NULL,
      importer_address character varying(255) NOT NULL,
      importer_city_state character varying(255) NOT NULL,
      importer_pin character varying(100),
      importer_phone character varying(255),
      importer_mail character varying(255),
      importer_contact_person_1 character varying(255),
      importer_contact_person_2 character varying(255),
      created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT import_id PRIMARY KEY (id)
    );


  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    drop table import;
`);
}
