"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const route_1 = tslib_1.__importDefault(require("./buyer/route"));
// import supplier_routes from './supplier/route';
const route_2 = tslib_1.__importDefault(require("./import/route"));
const route_3 = tslib_1.__importDefault(require("./export/route"));
const routes = express_1.default.Router();
routes.use('/buyer', route_1.default.customer_routes);
routes.use('/buyer', route_1.default.admin_routes);
// routes.use('/supplier', supplier_routes.customer_routes);
// routes.use('/supplier', supplier_routes.admin_routes);
routes.use('/import', route_2.default.admin_routes);
routes.use('/import', route_2.default.customer_routes);
routes.use('/export', route_3.default.admin_routes);
routes.use('/export', route_3.default.customer_routes);
exports.default = routes;
//# sourceMappingURL=route.js.map