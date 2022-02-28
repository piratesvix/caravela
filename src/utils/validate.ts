import * as Joi from 'joi';

/**
 * auxiliar de utilitários em validações
 *
 * @param <T> data
 * @param <Joi.SchemaLike> schema
 * @returns <Promise>
 */
export default async function validate<T>(
  data: T,
  schema: Joi.SchemaLike
): Promise<void> {
  await Joi.validate(data, schema, { abortEarly: false });
}