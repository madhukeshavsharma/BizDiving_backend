import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`


    CREATE TABLE IF NOT EXISTS admin_master
    (
      id bigserial NOT NULL,
      user_name character varying(255),
      password character varying(255),
      force_change_password boolean default true,
      full_name character varying(255),
      phone character varying(255),
      email_id character varying(255),
      is_deleted boolean default false,
      created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT admin_master_id PRIMARY KEY (id)
    );


  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    drop table admin_master;
`);
}
