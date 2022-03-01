import app from './app';
import logger from './utils/logger';
import config from './config/config';
import nodeErrorHandler from './middlewares/nodeErrorHandler';

const { port } = config;

if (!port) {
  throw new Error('Porta da aplicação não associada.');
}

app
  .listen(+port, () => {
    logger.log('info', `Caravelas API Server está sendo executado em http://localhost:${port}`);
  })
  .on('error', nodeErrorHandler);