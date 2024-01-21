import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Bizdiving Core-API',
      description:
        '<a href="/core/swagger.json" target="_blank">API Document JSON</a>',
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

export default swaggerJsdoc(options);
