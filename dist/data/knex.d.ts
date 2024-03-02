import { Knex } from 'knex';
export declare class DB {
    static write: any;
    static read: any;
}
export declare function pingdb(): Promise<boolean>;
export declare function connectdb(): Promise<boolean>;
export declare function getTransaction(): Promise<Knex.Transaction<any, any[]>>;
