import mongoose from "mongoose";
const { model, Schema } = mongoose;
const userSchema = Schema(
  {
    username: {
      type: String,
      lowercase: true,
      trim: true,
    },
    password: String,
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default model("user", userSchema);
