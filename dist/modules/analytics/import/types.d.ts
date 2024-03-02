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
