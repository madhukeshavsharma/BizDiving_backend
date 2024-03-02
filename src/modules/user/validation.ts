import Joi from 'joi';

export const create_admin = Joi.object({
  user_name: Joi.string().min(3).max(70).required(),
  password: Joi.string().min(3).max(70).required(),
  full_name: Joi.string().min(5).max(70).trim().required(),
  email: Joi.string().email({minDomainSegments: 2}).required(),
  phone: Joi.string().min(2).max(25).required(),
});
