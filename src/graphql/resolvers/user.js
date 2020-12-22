import apolloServer from "apollo-server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../../config/index.js";
import {
  validateLoginData,
  validateRegisterData,
} from "../../utils/validator.js";

const { MY_SECRET } = config;
const { UserInputError } = apolloServer;
const { hash, compare } = bcrypt;
const { sign } = jwt;

const generateToken = (user) => {
  const payload = { id: user._id, username: user.username, email: user.email };

  return sign(payload, MY_SECRET, { expiresIn: "1h" });
};
export const userResolver = {
  Mutation: {
    async login(parent, args, { User }, info) {
      const value = validateLoginData(args);

      const { username, password } = args;
      let user = await User.findOne({ username });
      if (!user) throw new Error("User not found");

      const isValidPassword = await compare(password, user.password);
      if (!isValidPassword)
        throw new apolloServer.AuthenticationError("Invalid credentials");

      return {
        id: user.id,
        ...user._doc,
        token: generateToken(user),
      };
    },
    async register(parent, args, { User }, info) {
      validateRegisterData(args.data);

      const { username, password, email } = args.data;
      let user = await User.findOne({ $or: [{ username }, { email }] });

      if (user)
        throw new UserInputError("Conflict", {
          errors: {
            error: "username/email already taken",
          },
        });

      user = new User(args.data);
      user.password = await hash(password, 12);
      user = await user.save();

      return {
        id: user.id,
        ...user._doc,
        token: generateToken(user),
      };
    },
  },
  Query: {
    user(parent, { username }, { User }, info) {
      return User.findOne({ username });
    },
  },
};
