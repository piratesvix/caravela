import logger from '../utils/logger';
import config from '../config/config';
import * as object from '../utils/object';
import CandidatoSession from '../models/CandidatoSession';
import ErrorType from '../resources/enums/ErrorType';
import ForbiddenError from '../exceptions/ForbiddenError';
import CandidatoSessionSobre from '../domain/entities/CandidatoSessionSobre';
import CandidatoSessionPayload from '../domain/requests/CandidatoSessionPayload';

const { errors } = config;

/**
 * cadastrar o candidato da carga útil do usuário
 *
 * @param {CandidatoSessionPayload} params
 * @returns {Promise<CandidatoSessionSobre>}
 */
export async function create(
  params: CandidatoSessionPayload
): Promise<CandidatoSessionSobre> {
  logger.log('info', 'Sessão do Candidato: Criando Sessão -', params);

  const session = (await new CandidatoSession(params).save()).serialize();

  logger.log('debug', 'Sessão do Candidato: Sessão criada com sucesso -', session);

  return object.camelize(session);
}

/**
 * desative a sessão do candidato
 *
 * @param {string} token
 * @returns {Promise<CandidatoSessionSobre>}
 */
export async function remove(token: string): Promise<CandidatoSessionSobre> {
  try {
    logger.log('info', 'Sessão do Candidato: Desativando token - %s', token);

    const session = (
      await new CandidatoSession()
        // TODO: Fix this via. knex
        .where({ token, is_active: true })
        .save({ isActive: false }, { patch: true })
    ).serialize();

    logger.log('debug', 'Sessão do Candidato: Desativando sessão -', session);

    return object.camelize(session);
  } catch (err) {
    if (err.message === ErrorType.NO_ROWS_UPDATED_ERROR) {
      throw new ForbiddenError(errors.sessionNotMaintained);
    }

    throw err;
  }
}