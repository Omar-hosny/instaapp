const joi = require("@hapi/joi");

const registerValidation = data => {
  const schema = joi.object({
    name: joi
      .string()
      .min(2)
      .required(),
    email: joi
      .string()
      .email()
      .required(),
    password: joi
      .string()
      .min(6)
      .required()
  });

  return schema.validate(data);
};

// login validation
const loginValidation = data => {
  const schema = joi.object({
    email: joi
      .string()
      .email()
      .required(),
    password: joi.string().required()
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
