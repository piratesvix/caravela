import { StatusCodes } from 'http-status-codes';

import Error from './Error';

/**
 * @class ForbiddenError
 * @extends {Error}
 */
class ForbiddenError extends Error {
  /**
   * mensagem de erro a ser disparada.
   *
   * @type {string}
   * @memberof UnauthorizedError
   */
  message: string;

  /**
   * criar uma instância de ForbiddenError.
   *
   * @param {string} message
   * @memberof ForbiddenError
   */
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);

    this.message = message;
  }
}

export default ForbiddenError;