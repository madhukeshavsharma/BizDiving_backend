export interface IImporterDetails {
  importer_name?: string;
  importer_address?: string;
  importer_city_state?: string;
  importer_pin?: string;
  importer_phone?: string;
  importer_mail?: string;
  importer_contact_person_1?: string;
  importer_contact_person_2?: string;
}

export interface ISupplierDetails {
  supplier_name?: string;
  supplier_address?: string;
}
export interface IImport {
  type: string;
  cush: string;
  indian_port: string;
  mode_of_shipment: string;
  be_no: string;
  be_date: string;
  be_type: string;
  month: string;
  cth_hscode: string;
  country_of_origin: string;
  item_description: string;
  invoice_currency: string;
  invoice_unit_price_fc: number;
  quantity: number;
  uqc: string;
  unit_price: number;
  total_ass_value: number;
  total_duty_paid: number;
  cha_name: string;
  iec: string;
  importer_name: string;
  port_of_shipment: string;
  supplier_name: string;
  supplier_address: string;
  importer_address: string;
  importer_city_state: string;
  importer_pin: string;
  importer_phone: string;
  importer_mail: string;
  importer_contact_person_1: string;
  importer_contact_person_2: string;
}

export interface IExcelImport {
  Type: string;
  CUSH: string;
  'Indian Port': string;
  'Mode of Shipment': string;
  BE_NO: string;
  BE_Date: string;
  BE_Type: string;
  Month: string;
  CTH_HSCODE: string;
  Country_of_Origin: string;
  Item_Description: string;
  INVOICE_CURRENCY: string;
  Invoice_Unit_Price_FC: string;
  Quantity: string;
  UQC: string;
  Unit_Price: number;
  TOTAL_ASS_VALUE: string;
  Total_Duty_Paid: string;
  CHA_Name: string;
  IEC: string;
  Importer_Name: string;
  Port_of_Shipment: string;
  Supplier_Name: string;
  Supplier_Address: string;
  Importer_Address: string;
  Importer_City_State: string;
  Importer_PIN: string;
  Importer_Phone: string;
  Importer_Mail: string;
  Importer_Contact_Person_1: string;
  Importer_Contact_Person_2: string;
}

export interface IDuration {
  start_date: string;
  end_date: string;
}

const demo = {
  Type: 'Import', //string 10
  CUSH: 'INAMD4', //string 255
  'Indian Port': 'AHEMDABAD AIR ACC (INAMD4)', //string 255
  'Mode of Shipment': 'Air Cargo', // string 50
  BE_NO: '6639676', //string 255
  BE_Date: '11-12-2021', //string 50
  BE_Type: 'H', //string 50
  Month: 44531, //integer
  CTH_HSCODE: '30022019', //string 255
  Country_of_Origin: 'UNITED KINGDOM', //string 100
  //string 255
  Item_Description:
    'SCIENTIFIC REFERENCE STANDARD FOR LABORATORY USE. INFLUENZAANTIGEN B/WASHINGTON/02/2019 9B VICTORIA LINEAGE) 19/238. GL',
  INVOICE_CURRENCY: 'GBP', //string 50
  Invoice_Unit_Price_FC: '107', //number
  Quantity: '15', //number
  UQC: 'NOS', //string 50
  Unit_Price: 11672.33,
  TOTAL_ASS_VALUE: '175085.01', //number
  Total_Duty_Paid: '36732.9', //number
  CHA_Name: 'N/A', //string 255
  IEC: '0895001721', //string 255
  Importer_Name: 'CADILA HEALTHCARE LIMITED', //string 255
  Port_of_Shipment: 'N/A', //string 255
  Supplier_Name: 'NATIONAL INST.FOR BIOLOGICAL STANDARDS & CONTROL', //string 255
  Supplier_Address: 'N/A', //string 255
  //string 255
  Importer_Address:
    'ZYDUS CORPORATE PARK, SCHEME NO 63,  KHORAJ (GANDHINAGAR), NR. VAISHNODE',
  Importer_City_State: 'AHMEDABAD', //string 100
  Importer_PIN: '382481', //string 150
  Importer_Phone: '(079)6770100/6732368 FAX 079-6732368', //string 100
  Importer_Contact_Person_1: 'MR. PANKAJ R PATEL', //string 255
};

export interface IPagination {
  page_index: number;
  page_size: number;
}

export interface IDynamicSearchImportParams {
  search_text?: string;
  filter?: IImport;
  pagination?: IPagination;
  duration?: IDuration;
}
