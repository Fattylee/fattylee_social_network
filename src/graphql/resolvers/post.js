import apolloServer from "apollo-server";
import { authChecker } from "../../utils/authChecker.js";
import {
  validatePostData,
  validatePostDeleteData,
} from "../../utils/validator.js";

export const postResolver = {
  Query: {
    getPosts(parent, args, ctx, info) {
      return ctx.Post.find().sort({ createdAt: -1 });
    },
    hello: () => "Hello, world!",
  },
  Mutation: {
    createPost(_, { body }, ctx) {
      validatePostData({ body });

      const user = authChecker(ctx);

      return ctx.Post.create({ body, username: user.username });
    },
    async deletePost(_, { postId }, ctx) {
      validatePostDeleteData({ postId });

      const user = authChecker(ctx);

      const post = await ctx.Post.findById(postId);

      if (!post) throw new Error("Post not found");

      if (post.username !== user.username)
        throw new apolloServer.ForbiddenError(
          `You are not allowed to delete postId '${postId}'`
        );
      // Action not allowed

      await post.remove();

      return "Post deleted successfully";
    },
    async likePost(_, { postId }, ctx) {
      validatePostDeleteData({ postId });
      const user = authChecker(ctx);

      const post = await ctx.Post.findById(postId);

      if (!post) throw new apolloServer.UserInputError("Post not found");

      const like = post.likes.find((like) => like.username === user.username);

      if (like) {
        like.remove();
      } else {
        post.likes.unshift({ username: user.username });
      }
      return post.save();
    },
  },
};
