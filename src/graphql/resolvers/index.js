import jwt from "jsonwebtoken";
import { MY_SECRET } from "../../config/index.js";
import { commentResolver } from "./comment.js";
import { postResolver } from "./post.js";
import { userResolver } from "./user.js";

export default {
  Post: {
    likeCount(parent) {
      return parent.likes.length;
    },
    commentCount(parent) {
      return parent.comments.length;
    },
    async author(parent, _, { User }) {
      return User.findById(parent.user);
    },
  },
  User: {
    posts(parent, _, { Post }) {
      return Post.find({ username: parent.username });
    },
    postCount(parent, _, { Post }) {
      return Post.countDocuments({
        user: parent.id,
      });
    },
  },
  UserPayload: {
    token({ _id, username, email }) {
      const payload = { id: _id, username, email };
      return jwt.sign(payload, MY_SECRET, { expiresIn: "1h" });
    },
  },
  Query: {
    ...userResolver.Query,
    ...postResolver.Query,
    ...commentResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
    ...commentResolver.Mutation,
  },
};
