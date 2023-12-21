import Joi from "joi";

export const signUpValid = Joi.object({
  userName: Joi.string().required().min(5).max(100),
  email: Joi.string().required().min(5).max(100),
  password: Joi.string().required().min(5).max(100),
  confirmPassword: Joi.string()
    .required()
    .min(5)
    .max(100)
    .valid(Joi.ref("password")),
});
export const signInValid = Joi.object({
  email: Joi.string().required().min(5).max(100),
  password: Joi.string().required().min(5).max(100),
});
