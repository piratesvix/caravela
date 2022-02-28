import morgan, { StreamOptions } from 'morgan';
import logger from '../utils/logger';
import config from '../config/config';
// substitui o método stream informando contando
// morgan para usar nosso logger personalizado em vez do console.log.
const stream: StreamOptions = {
  // Use the http severity
  write: (message) => logger.http(message)
};
// ignora todo o log http do Morgan se o
// o aplicativo não está sendo executado no modo de desenvolvimento.
// Este método não é realmente necessário aqui, pois
// já dissemos ao logger que ele deveria exibir
// somente mensagens de aviso e errors em produção.
const skip = (): boolean => config.environment !== 'development';

// construir o middleware morgan
const logHandler = morgan(
  // defina a string do formato da mensagem (este é o padrão).
  // o formato da mensagem é feito de tokens, e cada token é
  // definido dentro da biblioteca Morgan.
  // você pode criar seu token personalizado para mostrar o que deseja de uma solicitação.
  ':method :url :status :res[content-length] - :response-time ms',
  // opções: neste caso, sobrescrevi o stream e a lógica de salto.
  // Veja os métodos acima.
  { stream, skip }
);

export default logHandler;