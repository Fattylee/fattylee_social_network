import apolloServer from "apollo-server";

import { authChecker } from "../../utils/authChecker.js";
import {
  validateCommentData,
  validateCommentDeleteData,
} from "../../utils/validator.js";

export const commentResolver = {
  Mutation: {
    async createComment(_, { postId, body }, ctx) {
      validateCommentData({ body, postId });

      const { username } = authChecker(ctx);
      const post = await ctx.Post.findById(postId);

      if (!post) throw new apolloServer.UserInputError("Post not found");

      post.comments.unshift({
        body,
        username,
        // createdAt: new Date().toISOString(),
      });
      return post.save();
    },
    async deleteComment(_, { postId, commentId }, ctx) {
      validateCommentDeleteData({ commentId, postId });
      const user = authChecker(ctx);
      const post = await ctx.Post.findById(postId);

      if (!post) throw new apolloServer.UserInputError("Post not found");

      const comment = post.comments.find((cm) => cm._id == commentId);

      if (!comment) throw new apolloServer.UserInputError("Comment not found");

      if (comment.username !== user.username)
        throw new apolloServer.AuthenticationError("Action not allowed");

      comment.remove();
      await post.save();

      return "Deleted comment successfully";
    },
  },
  Query: {},
};
