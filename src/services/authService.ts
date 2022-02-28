import Candidato from '../models/Candidato';
import * as jwt from '../utils/jwt';
import logger from '../utils/logger';
import config from '../config/config';
import * as bcrypt from '../utils/bcrypt';
import CandidatoSession from '../models/CandidatoSession';
import JWTPayload from '../domain/misc/JWTPayload';
import ForbiddenError from '../exceptions/ForbiddenError';
import LoginPayload from '../domain/requests/LoginPayload';
import * as sessionService from '../services/sessionService';
import TokenResponse from '../domain/responses/TokenResponse';
import UnauthorizedError from '../exceptions/UnauthorizedError';

const { errors } = config;

/**
 * criar uma sessão de candidato para login de usuário válido
 *
 * @param {LoginPayload} loginPayload
 * @returns {TokenResponse}
 */
export async function login(
  loginPayload: LoginPayload
): Promise<TokenResponse> {
  const { email, password } = loginPayload;

  logger.log('info', 'Verificando o e-mail: %s', email);
  const candidato = await new Candidato({ email }).fetch();

  if (candidato) {
    logger.log('debug', 'Login: Candidato buscado por e-mail -', candidato.attributes);
    logger.log('debug', 'Login: Comparando senha');

    const isSame = await bcrypt.compare(password, candidato.attributes.password);

    logger.log('debug', 'Login: Status de correspondência de senha - %s', isSame);

    if (isSame) {
      const { name, roleId, id: userId } = candidato.attributes;
      const loggedInCandidato = { name, email, userId, roleId };
      const refreshToken = jwt.generateRefreshToken(loggedInCandidato);
      const candidatoSessionPayload = { userId, token: refreshToken };
      const session = await sessionService.create(candidatoSessionPayload);
      const accessToken = jwt.generateAccessToken({
        ...loggedInCandidato,
        sessionId: session.id
      });

      return { refreshToken, accessToken };
    }
  }

  throw new UnauthorizedError(errors.invalidCredentials);
}

/**
 * atualizar novo token de acesso
 *
 * @param {string} token
 * @param {jwtPayload} jwtPayload
 * @returns {TokenResponse}
 */
export async function refresh(
  token: string,
  jwtPayload: JWTPayload
): Promise<TokenResponse> {
  logger.log('info', 'Sessão de Candidato: Buscando sessão de token - %s', token);

  const session = await new CandidatoSession({ token, isActive: true }).fetch();

  if (!session) {
    throw new ForbiddenError(errors.sessionNotMaintained);
  }

  logger.log('debug', 'Sessão do Candidato: Obteve Sessão -', session.serialize());
  logger.log('info', 'JWT: Gerando um novo token');

  const accessToken = jwt.generateAccessToken({
    ...jwtPayload,
    sessionId: session.id
  });

  return {
    accessToken
  };
}

/**
 * remover sessão do candidato
 *
 * @param {string} token
 */
export async function logout(token: string): Promise<void> {
  logger.log('info', 'Logout: Saindo da sessão - %s', token);

  const session = await sessionService.remove(token);

  if (!session) {
    throw new ForbiddenError(errors.sessionNotMaintained);
  }
}