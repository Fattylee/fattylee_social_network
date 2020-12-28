import apolloServer from "apollo-server";
import jwt from "jsonwebtoken";
import { MY_SECRET } from "../config/index.js";

export const authChecker = (context) => {
  const authHeader = context.req.headers.authorization;

  if (!authHeader)
    throw new apolloServer.AuthenticationError(
      "Authorization header must be provided"
    );

  const token = authHeader.split(/bearer\s+/i)[1];

  if (!token)
    throw new apolloServer.ForbiddenError(
      'Authentication token must be "Bearer [token]"'
    );

  try {
    return jwt.verify(token, MY_SECRET);
  } catch (error) {
    throw new apolloServer.AuthenticationError("Invalid/Expired token");
  }
};
