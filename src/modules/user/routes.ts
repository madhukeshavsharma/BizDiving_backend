import express from 'express';
import * as controllers from './controller';

const customer_routes = express.Router();
const admin_routes = express.Router();

admin_routes.post('/create', controllers.createAdmin);
admin_routes.post('/updatePassword');
admin_routes.get('/');
admin_routes.post('/auth/login');

export default {admin_routes, customer_routes};
