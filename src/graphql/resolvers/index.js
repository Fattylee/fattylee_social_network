import { commentResolver } from "./comment.js";
import { postResolver } from "./post.js";
import { userResolver } from "./user.js";

export default {
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
