export interface IBuyer {
  company_name: string;
  contact_person: string;
  designation: string;
  email_id: string;
  contact_no: string;
  address: string;
  country: string;
}

export interface IExcelBuyer {
  'Company Name': string;
  'Contact Person': string;
  Designation: string;
  'Email Id': string;
  'Contact No': string;
  Address: string;
  Country: string;
}

const demo = [
  {
    'Company Name': 'BIOMAXIMA SA',
    'Contact Person': 'Piotr Janowski',
    Designation: 'Chief Operating Oficer',
    'Email Id': 'p.janowski@biomaxima.com',
    'Contact No': '48-814408371',
    Address: 'Vetterów 5 20-277 Lublin',
    Country: 'POLAND',
  },
  {
    'Company Name': 'Hemopharm Gmbh',
    'Contact Person': 'Ryll Sabine',
    Designation: 'Manager',
    'Email Id': 'svakodobro@hemofarm.com, sabine.ryll@stada.de',
    'Contact No': '49-6101985740',
    Address: 'Theodor-Heuss-Strasse 52\n61118 Bad Vilbel',
    Country: 'Germany',
  },
];

export interface IPagination {
  page_index: number;
  page_size: number;
}

export interface IDynamicSearchBuyerParams {
  search_text?: string;
  filter?: IBuyer;
  pagination?: IPagination;
}
