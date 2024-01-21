import {createServer} from './server';
import {logger} from './utilities/logger/winston_logger';
import {NODE_ENV} from './config/index';
import {SERVER_PORT} from './config/index';

async function app() {
  const server = await createServer();

  const port = +SERVER_PORT || 8080;
  server.listen(port, () => {
    logger.info(`=================================`);
    logger.info(`======= ENV: ${NODE_ENV} =======`);
    logger.info(`🚀 App listening on the port ${port}`);
    logger.info(`=================================`);
    logger.info(`======= SWAGGER DOCS ============`);
    logger.info(`http://localhost:${port}/core/swagger`);
    logger.info(`=================================`);
  });
}
app();
