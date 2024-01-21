import {IPagination} from '../import/types';

const export_eg = {
  Type: 'Export',
  'Sbill No': '6414027',
  'Sbill Date': '01-12-2021',
  'Port of Loading': 'AHEMDABAD AIR ACC (INAMD4)',
  'Mode of Shipment': 'Air Cargo',
  'Port Code': 'INAMD4',
  Month: '2021-12-01T00:00:00.000Z',
  'HS Code': '30049011',
  'Item Description': 'KAISHORE GUGULU TABLETS',
  Quantity: '4000',
  UQC: 'NOS',
  'Unit Rate in FC': '0.34',
  Currency: 'USD',
  'Unit Value in INR': 25,
  'Total FOB Value in INR': 100000,
  'Invoice No': 'EXP002/21-22',
  'Port of Discharge': 'ONTARIO, METROPOLIT',
  Country: 'CANADA',
  'Buyer Name': 'ZURICH PHARMA INC',
  Buyer_Address: undefined,
  IEC: 'AAUFB3745M',
  'Exporter Name': 'BONITEK PHARMACEUTICALS LLP',
  Exporter_Address: 'B/12 DIVINE RESIDENCY,NR DIVINE PA  RK SCIENCE CITY ROAD',
  Exporter_City_State: 'AHMEDABAD,GUJARAT',
  Exporter_PIN: '380060',
  Exporter_Phone: '919537785477',
  Exporter_mail: 'bonitekpharma@gmail.com',
  Exporter_Contact_Person_1: 'VARUNKUMAR GUNVANTBHAI PATEL',
  Exporter_Contact_Person_2:
    'KAILASHBEN GUNVANTBHAI PATEL            KANTILAL KISHORDAS PATEL              B/12 DIVINE RESIDENCY,NR DIVINE PA  RK SOLA SCIENCE CITY ROAD      AHMEDABAD,GUJARAT          PIN-380060 Phone/Email:919725056068',
};

export interface IExcelExport {
  Type: string;
  'Sbill No': string;
  'Sbill Date': string;
  'Port of Loading': string;
  'Mode of Shipment': string;
  'Port Code': string;
  Month: string;
  'HS Code': string;
  'Item Description': string;
  Quantity: string;
  UQC: string;
  'Unit Rate in FC': string;
  Currency: string;
  'Unit Value in INR': number;
  'Total FOB Value in INR': number;
  'Invoice No': string;
  'Port of Discharge': string;
  Country: string;
  'Buyer Name': string;
  Buyer_Address: string;
  IEC: string;
  'Exporter Name': string;
  Exporter_Address: string;
  Exporter_City_State: string;
  Exporter_PIN: string;
  Exporter_Phone: string;
  Exporter_mail: string;
  Exporter_Contact_Person_1: string;
  Exporter_Contact_Person_2: string;
}

export interface IExport {
  type: string;
  sbill_no: string;
  sbill_date: string;
  port_of_loading: string;
  mode_of_shipment: string;
  port_code: string;
  month: string;
  hs_code: string;
  item_description: string;
  quantity: number;
  uqc: string;
  unit_rate_in_fc: number;
  currency: string;
  unit_value_in_inr: number;
  total_fob_value_in_inr: number;
  invoice_no: string;
  port_of_discharge: string;
  country: string;
  buyer_name: string;
  buyer_address: string;
  iec: string;
  exporter_name: string;
  exporter_address: string;
  exporter_city_state: string;
  exporter_pin: string;
  exporter_phone: string;
  exporter_mail: string;
  exporter_contact_person_1: string;
  exporter_contact_person_2: string;
}

export interface IDuration {
  start_date: string;
  end_date: string;
}
export interface IDynamicSearchExportParams {
  search_text?: string;
  filter?: IExport;
  pagination?: IPagination;
  duration?: IDuration;
}

export interface IExporterDetails {
  exporter_name: string;
  exporter_address: string;
  exporter_city_state: string;
  exporter_pin: string;
  exporter_phone: string;
  exporter_mail: string;
  exporter_contact_person_1: string;
  exporter_contact_person_2: string;
}

export interface IBuyerDetails {
  buyer_name: string;
  buyer_address: string;
}
