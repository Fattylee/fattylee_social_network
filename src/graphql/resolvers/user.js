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
const { hash } = bcrypt;
const { sign } = jwt;

export const userResolver = {
  Mutation: {
    async login(parent, args, { User }, info) {
      const { errors, isValid } = validateLoginData(args);
      if (!isValid) throw new UserInputError("Errors", { errors });

      const { username, password } = args;
      let user = await User.findOne({ username });
    },
    async register(parent, args, { User }, info) {
      const { errors, isValid } = validateRegisterData(args.data);
      if (!isValid) throw new UserInputError("Errors", { errors });

      const { username, password, confirm_password, email } = args.data;
      let user = await User.findOne({ username });

      console.log(user, "=======found========");
      if (user)
        throw new UserInputError("Conflict", {
          errors: {
            error: "username/email already taken",
          },
        });

      user = new User(args.data);
      user.password = await hash(password, 12);
      user = await user.save();

      const payload = { id: user._id, username, email };
      const token = sign(payload, MY_SECRET, { expiresIn: "1h" });

      return {
        id: user.id,
        ...user._doc,
        token,
      };
    },
  },
  Query: {
    user(parent, { username }, { User }, info) {
      return User.findOne({ username });
    },
  },
};
