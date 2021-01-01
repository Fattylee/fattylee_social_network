import Joi from "joi";
import apolloServer from "apollo-server";

const formatError = (error) =>
  error?.details.reduce((prev, curValue) => {
    prev[curValue.path[0]] = curValue.message;
    return prev;
  }, {}) || {};

const validateOption = { abortEarly: false, errors: { wrap: { label: "" } } };

export const validateRegisterData = (data) => {
  const { error, value } = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(8).max(20).required(),
    confirm_password: Joi.any()
      .valid(Joi.ref("password"))
      .options({
        messages: { "any.only": "{{#label}} must match password" },
      }),
    email: Joi.string().email().required(),
  }).validate(data, validateOption);

  if (error)
    throw new apolloServer.UserInputError("Errors", {
      errors: formatError(error),
    });

  return value;
};

export const validateLoginData = (data) => {
  const { error, value } = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(8).max(20).required(),
  }).validate(data, validateOption);

  if (error)
    throw new apolloServer.UserInputError("Errors", {
      errors: formatError(error),
    });

  return value;
};

export const validatePostData = (data) => {
  const { error, value } = Joi.object({
    body: Joi.string().min(3).required(),
  }).validate(data, validateOption);

  if (error)
    throw new apolloServer.UserInputError("Errors", {
      errors: formatError(error),
    });

  return value;
};

export const validatePostID = (data) => {
  const { error, value } = Joi.object({
    postId: Joi.string()
      .pattern(/[0-9a-f]{24}/)
      .message("Invalid post id")
      .required(),
  }).validate(data, validateOption);

  if (error)
    throw new apolloServer.UserInputError("Errors", {
      errors: formatError(error),
    });

  return value;
};

export const validateCommentData = (data) => {
  const { error, value } = Joi.object({
    postId: Joi.string()
      .pattern(/[0-9a-f]{24}/)
      .message("Invalid post id")
      .required(),
    body: Joi.string().required(),
  }).validate(data, validateOption);

  if (error)
    throw new apolloServer.UserInputError("Errors", {
      errors: formatError(error),
    });

  return value;
};

export const validateCommentDeleteData = (data) => {
  const { error, value } = Joi.object({
    postId: Joi.string()
      .pattern(/[0-9a-f]{24}/)
      .message("Invalid post id")
      .required(),
    commentId: Joi.string()
      .pattern(/[0-9a-f]{24}/)
      .message("Invalid comment id")
      .required(),
  }).validate(data, validateOption);

  if (error)
    throw new apolloServer.UserInputError("Errors", {
      errors: formatError(error),
    });

  return value;
};
