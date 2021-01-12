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
    async createPost(_, { body }, ctx) {
      validatePostData({ body });
      const user = authChecker(ctx);

      const newPost = await ctx.Post.create({
        body,
        username: user.username,
        user: user.id,
      });

      ctx.pubSub.publish("NEW_POST", { newPost });
      return newPost;
    },
    async editPost(_, { postId, body }, ctx) {
      const value = validateEditPostData({ postId, body });
      body = value.body;

      const user = authChecker(ctx);

      const post = await ctx.Post.findById(postId);

      if (!post) throw new Error("Post not found");

      if (post.username !== user.username)
        throw new apolloServer.ForbiddenError(
          `You are not allowed to edit postId '${postId}'`
        );
      if (body) post.body = body;

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

      if (!post) throw new Error("Post not found");

      const like = post.likes.find((like) => like.username === user.username);

      if (like) {
        like.remove();
      } else {
        post.likes.push({ username: user.username });
      }
      return post.save();
    },
  },
  Subscription: {
    newPost: {
      subscribe(_, __, ctx) {
        return ctx.pubSub.asyncIterator("NEW_POST");
      },
    },
    comment: {
      async subscribe(_, { postId }, { Post, pubSub }) {
        const post = await Post.findById(postId);
        if (!post) throw new Error("Post not found");

        return pubSub.asyncIterator(`comment ${postId}`);
      },
    },
  },
};
