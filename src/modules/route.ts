import express from 'express';
import analytics_routes from './analytics/route';

const routes = express();

routes.use('/analytics', analytics_routes);

export default routes;
