import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import config from '../config/config';

const { name, version } = config;

/**
 * / GET request, responde as informações da API.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
export function index(_: Request, res: Response): void {
  res.status(StatusCodes.OK).json({
    name,
    version
  });
}