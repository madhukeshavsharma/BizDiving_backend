import express, {Request, Response} from 'express';
import * as controller from './controller';

const customer_routes = express.Router();
const admin_routes = express.Router();

admin_routes.post('/upload', controller.uploadExportData);
customer_routes.post('/search', controller.searchExportData);

export default {customer_routes, admin_routes};

/** POST - UPLOAD EXPORT EXCEL
 * @openapi
 *"/analytics/export/upload":
 *  post:
 *    description: "upload excel"
 *    tags:
 *    - Export
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

/** POST - SEARCH EXPORT EXCEL
 * @openapi
 *"/analytics/export/search":
 *  post:
 *    description: "SEARCH DATA"
 *    tags:
 *    - Export
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
 *                example:  {
 *                          "type": "Export",
 *                          "sbill_no": "6400259",
 *                          "sbill_date": "01-12-2021",
 *                          "port_of_loading": "AHEMDABAD AIR ACC (INAMD4)",
 *                          "mode_of_shipment": "Air Cargo",
 *                          "port_code": "INAMD4",
 *                          "month": "2021-12-01",
 *                          "hs_code": "30061020",
 *                          "item_description": "SURGISPON FILM,SIZE:200X70X5 MM,BATCH NO",
 *                          "quantity": 50,
 *                          "uqc": "PCS",
 *                          "unit_rate_in_fc": 15,
 *                          "currency": "USD",
 *                          "unit_value_in_inr": 1100,
 *                          "total_fob_value_in_inr": 55000,
 *                          "invoice_no": "ALPL/E/21-22/245",
 *                          "port_of_discharge": "SANTIAGO DE CHILE -",
 *                          "country": "CHILE",
 *                          "buyer_name": "PALNIC SPA",
 *                          "iec": "AARCA8892L",
 *                          "exporter_name": "AEGIS LIFESCIENCES PRIVATE LIMITED",
 *                          "exporter_city_state": "AHMADABAD,GUJARAT",
 *                          "exporter_pin": "382213",
 *                          "exporter_phone": "919825693131",
 *                          "exporter_mail": "gm@aegis-lifesciences.com",
 *                          "exporter_contact_person_1": "RANIL GUPTA",
 *                          "exporter_contact_person_2": "NEELAM GUPTA                    LAL CHAND KUNDANLAL AGARWAL             327, APPLEWOODS VILLA, NEAR SHANTI  PURA,CROSS ROAD, SOUTH BOPAL, BOPAL AHMEDABAD,GUJARAT          PIN-380058 Phone/Email:9427713131"
 *                          }
 *              pagination:
 *                type: object
 *                example: {
 *                          page_index: 0,
 *                          page_size: 10
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
