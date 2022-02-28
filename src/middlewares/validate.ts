import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import logger from '../utils/logger';
import validate from '../utils/validate';

/**
 * middleware para validar o esquema.
 *
 * @param {Joi.Schema} params
 */
export function schema(params: Joi.Schema) {
  return async (
    req: Request,
    _: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.log('info', 'Validando schema');

      await validate(req.body, params);

      next();
    } catch (err) {
      next(err);
    }
  };
}