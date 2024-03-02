import express, {Request, Response} from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './utilities/swagger_docs';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import {logger, stream} from './utilities/logger/winston_logger';
import {HttpResponse} from './handlers/HttpResponse';
import {connectdb, pingdb} from './data/knex';
import routes from './modules/route';

export async function createServer() {
  try {
    const server = express();
    await connectdb();

    server.use(morgan('dev', {stream}));
    server.use(cors());
    server.use(hpp());
    server.use(helmet());
    server.use(compression());
    server.use(express.json());
    server.use(express.urlencoded({extended: true}));

    /**
     * @openapi
     * /health:
     *  get:
     *     tags:
     *     - Health Check
     *     description: Responds if the app is up and running
     *     responses:
     *       200:
     *         description: App is up and running
     */
    server.use('/health', async (req: Request, res: Response) => {
      const dbOk = await pingdb();
      if (dbOk) {
        return HttpResponse(res, 200, 'success', {});
      } else {
        res.status(500).send('DB Error!!');
      }
    });

    server.use(
      '/core/swagger',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument, {explorer: true})
    );
    server.get('/core/swagger.json', (req: Request, res: Response) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerDocument);
    });

    server.use('/', routes);
    return server;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
