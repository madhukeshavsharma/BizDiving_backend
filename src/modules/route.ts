import express from 'express';
import analytics_route from './analytics/route';
import user_routes from './user/routes';

const routes = express();

//analytics module
routes.use('/analytics', analytics_route);

//user module
routes.use('/user/admin', user_routes.admin_routes);
routes.use('/user/customer', user_routes.customer_routes);

export default routes;
