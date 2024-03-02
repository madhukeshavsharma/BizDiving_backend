"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const route_1 = tslib_1.__importDefault(require("./analytics/route"));
const routes = (0, express_1.default)();
routes.use('/analytics', route_1.default);
exports.default = routes;
//# sourceMappingURL=route.js.map