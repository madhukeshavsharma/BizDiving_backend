import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`

    CREATE SEQUENCE IF NOT EXISTS importer_details_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

    CREATE TABLE IF NOT EXISTS importer_details
    (
      id bigint NOT NULL DEFAULT nextval('importer_details_id_seq'::regclass),
      importer_name character varying(255) NOT NULL,
      importer_address character varying(255) NOT NULL,
      importer_city_state character varying(255) NOT NULL,
      importer_pin character varying(100),
      importer_phone character varying(255),
      importer_mail character varying(255),
      importer_contact_person_1 character varying(255),
      importer_contact_person_2 character varying(255),
      created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT importer_details_id PRIMARY KEY (id)
    );


  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    drop table importer_details;
`);
}
