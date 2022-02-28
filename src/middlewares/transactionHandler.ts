import { v4 as uuidv4 } from 'uuid';
import { NextFunction, Request, Response } from 'express';

import context from '../utils/context';

/**
 * middleware do manipulador de transações.
 *
 * @param  {Request} req
 * @param  {Response} _
 * @param  {NextFunction} next
 * @returns {void}
 */
function transactionHandler(
  req: Request,
  _: Response,
  next: NextFunction
): void {
  // o primeiro argumento asyncLocalStorage.run é a inicialização do estado do store, o segundo argumento é a função que tem acesso a esse store
  context.run(new Map(), () => {
    // tentar extrair o TransactionId do cabeçalho da solicitação ou gere um novo se não existir
    const transactionId = req.headers['transactionId'] || uuidv4();

    // define o TransactionId dentro do store
    context.getStore().set('transactionId', transactionId);

    next();
  });
}

export default transactionHandler;