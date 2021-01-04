import apolloServer from "apollo-server";
import { authChecker } from "../../utils/authChecker.js";
import {
  validateEditPostData,
  validatePostData,
  validatePostID,
} from "../../utils/validator.js";

export const postResolver = {
  Query: {
    getPosts(parent, args, ctx, info) {
      console.log("getPost");
      return ctx.Post.find().sort({ createdAt: -1 });
    },
    getPost(_, { postId }, { Post }) {
      validatePostID({ postId });
      return Post.findById(postId);
    },
  },
  Mutation: {
    createPost(_, { body }, ctx) {
      console.log("createPost");
      validatePostData({ body });

      const user = authChecker(ctx);

      return ctx.Post.create({ body, username: user.username, user: user.id });
    },
    async editPost(_, { postId, body }, ctx) {
      validateEditPostData({ postId, body });

      const user = authChecker(ctx);

      const post = await ctx.Post.findById(postId);

      if (!post) throw new Error("Post not found");

      if (post.username !== user.username)
        throw new apolloServer.ForbiddenError(
          `You are not allowed to edit postId '${postId}'`
        );
      post.body = body;

      return post.save();
    },
    async deletePost(_, { postId }, ctx) {
      validatePostID({ postId });

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
      validatePostID({ postId });
      const user = authChecker(ctx);

      const post = await ctx.Post.findById(postId);

      if (!post) throw new apolloServer.UserInputError("Post not found");

      const like = post.likes.find((like) => like.username === user.username);

      if (like) {
        like.remove();
      } else {
        post.likes.push({ username: user.username });
      }
      return post.save();
    },
  },
};
