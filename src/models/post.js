import mongoose from "mongoose";
const { model, Schema } = mongoose;

const postSchema = Schema({
  body: String,
  comments: [
    {
      text: String,
      user: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

export default model("post", postSchema);
