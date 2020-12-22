import { postResolver } from "./post.js";
import { userResolver } from "./user.js";

export default {
  Query: {
    ...userResolver.Query,
    ...postResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
  },
};
