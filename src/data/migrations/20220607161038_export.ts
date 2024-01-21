import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`

    CREATE SEQUENCE IF NOT EXISTS export_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

    CREATE TABLE IF NOT EXISTS export
    (
      id bigint NOT NULL DEFAULT nextval('export_id_seq'::regclass),
      type character varying(50) NOT NULL,
      sbill_no character varying(100) NOT NULL,
      sbill_date character varying(100) NOT NULL,
      port_of_loading character varying(255) NOT NULL,
      mode_of_shipment character varying(100) NOT NULL,
      port_code character varying(100) NOT NULL,
      month date NOT NULL,
      hs_code character varying(255) NOT NULL,
      item_description character varying(255) NOT NULL,
      quantity float NOT NULL,
      uqc character varying(100) NOT NULL,
      unit_rate_in_fc float NOT NULL,
      currency character varying(100) NOT NULL,
      unit_value_in_inr float NOT NULL,
      total_fob_value_in_inr float NOT NULL,
      invoice_no character varying(255) NOT NULL,
      port_of_discharge character varying(255) NOT NULL,
      country character varying(255) NOT NULL,
      buyer_name character varying(255) NOT NULL,
      buyer_address character varying(255),
      iec character varying(255) NOT NULL,
      exporter_name character varying(255) NOT NULL,
      exporter_address character varying(255),
      exporter_city_state character varying(255),
      exporter_pin character varying(100),
      exporter_phone character varying(255),
      exporter_mail character varying(100),
      exporter_contact_person_1 character varying(255),
      exporter_contact_person_2 character varying(255),
      created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT export_id PRIMARY KEY (id)
    );


  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    drop table export;
`);
}
