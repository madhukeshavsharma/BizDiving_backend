import express from 'express';
import buyer_routes from './buyer/route';
import supplier_routes from './supplier/route';
import import_routes from './import/route';
import export_routes from './export/route';
import {authenticate_admin} from '@/middlewares/auth.middleware';
const routes = express.Router();

routes.use('/admin/buyer', authenticate_admin, buyer_routes.admin_routes);
routes.use('/buyer', buyer_routes.customer_routes);

routes.use('/admin/supplier', authenticate_admin, supplier_routes.admin_routes);
routes.use('/supplier', supplier_routes.customer_routes);

routes.use('/admin/import', authenticate_admin, import_routes.admin_routes);
routes.use('/import', import_routes.customer_routes);

routes.use('/admin/export', authenticate_admin, export_routes.admin_routes);
routes.use('/export', export_routes.customer_routes);

export default routes;
