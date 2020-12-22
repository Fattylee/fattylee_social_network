import mongoose from "mongoose";
const { model, Schema } = mongoose;

const postSchema = Schema(
  {
    body: String,
    username: {
      type: String,
      lowercase: true,
      trim: true,
    },
    comments: [
      {
        text: String,
        username: {
          type: String,
          lowercase: true,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: new Date().toISOString(),
        },
      },
    ],
    likes: [
      {
        username: String,
        createdAt: { type: Date, default: new Date().toISOString() },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export default model("post", postSchema);
