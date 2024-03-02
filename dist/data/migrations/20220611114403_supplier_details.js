"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.raw(`

    CREATE SEQUENCE IF NOT EXISTS supplier_details_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

    CREATE TABLE IF NOT EXISTS supplier_details
    (
      id bigint NOT NULL DEFAULT nextval('supplier_details_id_seq'::regclass),
      supplier_name character varying(255) NOT NULL,
      supplier_address character varying(255) NOT NULL,
      created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT supplier_details_id PRIMARY KEY (id)
    );


  `);
}
exports.up = up;
async function down(knex) {
    return knex.raw(`
    drop table supplier_details;
`);
}
exports.down = down;
//# sourceMappingURL=20220611114403_supplier_details.js.map