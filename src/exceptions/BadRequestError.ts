import { StatusCodes } from 'http-status-codes';

import Error from './Error';

/**
 * @class BadRequestError
 * @extends {Error}
 */
class BadRequestError extends Error {
  /**
   * mensagem de error a ser disparada
   *
   * @type {string}
   * @memberof UnauthorizedError
   */
  message: string;

  /**
   * criar uma instância de BadRequestError
   *
   * @param {string} message
   * @memberof ForbiddenError
   */
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);

    this.message = message;
  }
}

export default BadRequestError;