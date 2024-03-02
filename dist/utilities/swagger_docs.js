"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const swagger_jsdoc_1 = tslib_1.__importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'Bizdiving Core-API',
            description: '<a href="/core/swagger.json" target="_blank">API Document JSON</a>',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
                bearerAuthCustomer: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
                bearerAuthAdmin: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        servers: [
            {
                url: '',
                description: 'No Base Url',
            },
        ],
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    apis: ['./src/**/*.ts', './build/**/*.js'],
};
exports.default = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger_docs.js.map