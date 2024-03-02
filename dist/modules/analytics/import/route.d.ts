declare const _default: {
    customer_routes: import("express-serve-static-core").Router;
    admin_routes: import("express-serve-static-core").Router;
};
export default _default;
/** POST - UPLOAD IMPORT EXCEL
 * @openapi
 *"/analytics/import/upload":
 *  post:
 *    description: "upload excel"
 *    tags:
 *    - Import
 *    security:
 *    - bearerAuthAdmin: []
 *    summary: "Admin Auth"
 *    requestBody:
 *      content:
 *        application/json:
 *          name: body
 *          in: body
 *          description: Send post Data
 *          schema:
 *            type: object
 *      required: true
 *    responses:
 *      '200':
 *        description: Successfully
 *        schema:
 *          type: object
 *      '401':
 *        description: " Authorization token not provided"
 *      '403':
 *        description: " Input Data Validation Error "
 *      '500':
 *        description: " Internal Server Error "
 */
/** POST - SEARCH IMPORT EXCEL
 * @openapi
 *"/analytics/import/search":
 *  post:
 *    description: "SEARCH DATA"
 *    tags:
 *    - Import
 *    security:
 *    - bearerAuthCustomer: []
 *    summary: "Customer Auth"
 *    requestBody:
 *      content:
 *        application/json:
 *          name: body
 *          in: body
 *          description: Send post Data
 *          schema:
 *            type: object
 *            properties:
 *              search_text:
 *                type: string
 *                example: "UNITED KINGDOM"
 *              filter:
 *                type: object
 *                example: {
 *                         type: 'Import',
 *                         cush: 'INAMD4',
 *                         indian_port: 'AHEMDABAD AIR ACC (INAMD4)',
 *                         mode_of_shipment: 'Air Cargo',
 *                         be_no: '6639676',
 *                         be_date: '11-12-2021',
 *                         be_type: 'H',
 *                         month: "2021-12-01",
 *                         cth_hscode: '30022019',
 *                         country_of_origin: 'UNITED KINGDOM',
 *                         invoice_currency: 'GBP',
 *                         invoice_unit_price_fc: '107',
 *                         quantity: '15',
 *                         uqc: 'NOS',
 *                         unit_price: 11672.33,
 *                         total_ass_value: '175085.01',
 *                         total_duty_paid: '36732.9',
 *                         cha_name: 'N/A',
 *                         iec: '0895001721',
 *                         importer_name: 'CADILA HEALTHCARE LIMITED',
 *                         port_of_shipment: 'N/A',
 *                         supplier_name: 'NATIONAL INST.FOR BIOLOGICAL STANDARDS & CONTROL',
 *                         importer_city_state: 'AHMEDABAD',
 *                         importer_pin: '382481',
 *                         importer_phone: '(079)6770100/6732368 FAX 079-6732368',
 *                         importer_contact_person_1: 'MR. PANKAJ R PATEL'
 *                       }
 *              pagination:
 *                type: object
 *                example: {
 *                            page_index: 0,
 *                            page_size: 10
 *                          }
 *              duration:
 *                type: object
 *                example: {
 *                            start_date: 2021-12-01,
 *                            end_date: 2021-12-01
 *                          }
 *      required: true
 *    responses:
 *      '200':
 *        description: Successfully
 *        schema:
 *          type: object
 *      '401':
 *        description: " Authorization token not provided"
 *      '403':
 *        description: " Input Data Validation Error "
 *      '500':
 *        description: " Internal Server Error "
 */
