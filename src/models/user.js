import mongoose from "mongoose";
const { model, Schema } = mongoose;
const userSchema = Schema(
  {
    username: String,
    password: String,
    email: String,
  },
  { timestamps: true }
);

export default model("user", userSchema);
