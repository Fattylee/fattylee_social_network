import apolloServer from "apollo-server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authChecker } from "../../utils/authChecker.js";

import {
  validateLoginData,
  validateRegisterData,
} from "../../utils/validator.js";

const { UserInputError } = apolloServer;
const { hash, compare } = bcrypt;

export const userResolver = {
  Mutation: {
    async login(parent, args, { User, res }, info) {
      const value = validateLoginData(args);

      const { username, password } = args;
      let user = await User.findOne({ username });
      if (!user) throw new Error("User not found");

      const isValidPassword = await compare(password, user.password);
      if (!isValidPassword)
        throw new apolloServer.AuthenticationError("Invalid credentials");

      const accessToken = jwt.sign({ userId: user.id }, "suerscretekey", {
        expiresIn: "15min",
      });
      const refreshToken = jwt.sign(
        { userId: user.id, count: user.count },
        "more@ansjdsuerscretekey",
        {
          expiresIn: "7d",
        }
      );

      res.cookie("access-token", accessToken, {
        //  maxAge: 1000 * 60 * 15 ,
        expires: new Date(Date.now() + 1000 * 60 * 15),
        secure: true,
      }); //15min
      res.cookie("refresh-token", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      }); // 7days
      res.cookie("fatty", "loocer".repeat(5), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, //7days
        secure: false,
      });
      return user;
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

      return user;
    },
  },
  Query: {
    me(_, __, ctx) {
      const { id } = authChecker(ctx);
      return ctx.User.findById(id);
    },
  },
};
