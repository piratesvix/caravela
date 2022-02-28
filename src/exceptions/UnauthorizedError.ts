import { StatusCodes } from 'http-status-codes';

import Error from './Error';

/**
 * @class UnauthorizedError
 * @extends {Error}
 */
class UnauthorizedError extends Error {
  /**
   * mensagem de error a ser disparada.
   *
   * @type {string}
   * @memberof UnauthorizedError
   */
  message: string;

  /**
   * criar uma instância de UnauthorizedError
   *
   * @param {string} message
   * @memberof UnauthorizedError
   */
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);

    this.message = message;
  }
}

export default UnauthorizedError;