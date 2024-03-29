import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`

    CREATE SEQUENCE IF NOT EXISTS buyer_details_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

    CREATE TABLE IF NOT EXISTS buyer_details
    (
      id bigint NOT NULL DEFAULT nextval('buyer_details_id_seq'::regclass),
      buyer_name character varying(255) NOT NULL,
      buyer_address character varying(255),
      created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT buyer_details_id PRIMARY KEY (id)
    );


  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    drop table buyer_details;
`);
}
