import Joi from 'joi';

export const candidatoPOSTSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    firstName: Joi.string().min(4).max(125).label('FirstName').required(),
    lastName: Joi.string().min(4).max(125).label('LastName').required(),
    name: Joi.string().min(4).max(100).label('Name').required(),
    email: Joi.string().min(10).max(100).label('Email').required(),
    password: Joi.string().min(6).max(100).label('Password').required()
  });