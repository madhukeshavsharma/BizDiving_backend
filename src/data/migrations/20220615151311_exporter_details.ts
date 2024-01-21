import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`

    CREATE SEQUENCE IF NOT EXISTS exporter_details_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

    CREATE TABLE IF NOT EXISTS exporter_details
    (
      id bigint NOT NULL DEFAULT nextval('exporter_details_id_seq'::regclass),
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

        CONSTRAINT exporter_details_id PRIMARY KEY (id)
    );


  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    drop table exporter_details;
`);
}
