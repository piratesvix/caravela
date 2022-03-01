import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import config from '../config/config';
import * as candidatoService from '../services/candidatoService';
import CandidatoPayload from '../domain/requests/CandidatoPayload';

const { messages } = config;

/**
 * /users GET request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function index(
  _: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const response = await candidatoService.fetchAll();

    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: response,
      message: messages.candidatos.fetchAll
    });
  } catch (err) {
    next(err);
  }
}

/**
 * /candidatos POST request.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function store(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const candidatoPayload = req.body as CandidatoPayload;

    const response = await candidatoService.insert(candidatoPayload);

    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: response,
      message: messages.candidatos.insert
    });
  } catch (err) {
    next(err);
  }
}