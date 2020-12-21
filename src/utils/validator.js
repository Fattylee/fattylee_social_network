import Joi from "joi";

export const validateRegisterData = (data) => {
  const { username, password, confirm_password, email } = data;
  const errors = {};
  if (username.trim().length === 0) {
    errors.username = "Username cann not be empty";
  } else if (username.trim().length < 3 || username.trim().length > 20) {
    errors.username =
      "Username characters length can not be less than 3 or greater than 20";
  }
  if (password.trim().length === 0) {
    errors.password = "Password cann not be empty";
  } else if (password.length < 8 || password.length > 20) {
    errors.password =
      "password characters length can not be less than 8 or greater than 20";
  } else if (password !== confirm_password) {
    errors.password = "Password and confirm password must match";
  }
  if (email.trim().length === 0) {
    errors.email = "Email cann not be empty";
  } else if (!email.includes("@")) {
    errors.email = "Email must be a valid email";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

export const validateLoginData = (data) => {
  const { error } = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(3).max(20).required(),
  }).validate(data, { abortEarly: false, errors: { wrap: { label: "" } } });

  const errors = error?.details.reduce((prev, curValue) => {
    prev[curValue.path[0]] = curValue.message;
    return prev;
  }, {});

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
