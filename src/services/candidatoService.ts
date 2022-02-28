import Candidato from '../models/Candidato';
import logger from '../utils/logger';
import * as bcrypt from '../utils/bcrypt';
import * as object from '../utils/object';
import transform from '../utils/transform';
import Role from '../resources/enums/Role';
import CandidatoPayload from '../domain/requests/CandidatoPayload';
import CandidatoSobre from '../domain/entities/CandidatoSobre';

/**
 * buscar todos os candidatos na tabela de candidatos
 *
 * @returns {Promise<CandidatoSobre[]>}
 */
export async function fetchAll(): Promise<CandidatoSobre[]> {
  logger.log('info', 'Buscando candidatos em banco de dados...');

  const candidatos = await Candidato.fetchAll();
  const res = transform(candidatos.serialize(), (candidato: CandidatoSobre) => ({
    firstName: candidato.firstName,
    lastName: candidato.lastName,
    name: candidato.name,
    email: candidato.email,
    roleId: candidato.roleId,
    updatedAt: new Date(candidato.updatedAt).toLocaleString(),
    createdAt: new Date(candidato.updatedAt).toLocaleString()
  }));

  logger.log('debug', 'Buscou todos candidatos com sucesso:', res);

  return res;
}

/**
 * insirir o candidato a uma determinada de cargas para usuário
 *
 * @param {CandidatoPayload} params
 * @returns {Promise<CandidatoDetail>}
 */
export async function insert(params: CandidatoPayload): Promise<CandidatoSobre> {
  logger.log('info', 'Inserting candidato into database:', params);

  const password = await bcrypt.hash(params.password);
  const candidato = (
    await new Candidato({ ...params, password, roleId: Role.NORMAL_CANDIDATO }).save()
  ).serialize();

  logger.log('debug', 'Candidato registrado com sucesso:', candidato);

  return object.camelize(candidato);
}