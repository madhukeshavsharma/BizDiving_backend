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
export interface IPagination {
    page_index: number;
    page_size: number;
}
export interface IDynamicSearchBuyerParams {
    search_text?: string;
    filter?: IBuyer;
    pagination?: IPagination;
}
