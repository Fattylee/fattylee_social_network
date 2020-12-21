export const postResolver = {
  Query: {
    getPosts(parent, args, ctx, info) {
      console.log(ctx);
      return [{ body: "body 1" }, { body: "body 2" }];
    },
    hello: () => "Hello, world!",
  },
};
