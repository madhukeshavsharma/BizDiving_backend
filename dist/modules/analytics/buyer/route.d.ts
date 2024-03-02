declare const _default: {
    customer_routes: import("express-serve-static-core").Router;
    admin_routes: import("express-serve-static-core").Router;
};
export default _default;
/** POST - UPLOAD BUYER EXCEL
 * @openapi
 *"/analytics/buyer/upload":
 *  post:
 *    description: "upload excel"
 *    tags:
 *    - Buyer
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
/** POST - SEARCH BUYER EXCEL
 * @openapi
 *"/analytics/buyer/search":
 *  post:
 *    description: "SEARCH DATA"
 *    tags:
 *    - Buyer
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
 *                example: "BIOMAXIMA"
 *              filter:
 *                type: object
 *                example: {
 *                         company_name: 'BIOMAXIMA SA',
 *                         contact_person: 'Piotr Janowski',
 *                         designation: 'Chief Operating Oficer',
 *                         email_id: 'p.janowski@biomaxima.com',
 *                         contact_no: '48-814408371',
 *                         address: 'Vetterów 5 20-277 Lublin',
 *                         country: 'POLAND'
 *                         }
 *              pagination:
 *                type: object
 *                example: {
 *                            page_index: 0,
 *                            page_size: 10
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
