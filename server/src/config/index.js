import dotenv from "dotenv";
dotenv.config();

const config = {
  MONGODB: process.env.MONGODB,
  PORT: process.env.PORT,
  MY_SECRET: process.env.MY_SECRET,
};

export const MY_SECRET = config.MY_SECRET;

export default config;
