import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`

    CREATE SEQUENCE IF NOT EXISTS buyer_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

    CREATE TABLE IF NOT EXISTS buyer
    (
      id bigint NOT NULL DEFAULT nextval('buyer_id_seq'::regclass),
      company_name character varying(255),
      contact_person character varying(255),
      designation character varying(255),
      email_id character varying(255),
      contact_no character varying(255),
      address character varying(255),
      country character varying(255),
      created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT buyer_id PRIMARY KEY (id)
    );


  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    drop table buyer;
`);
}
