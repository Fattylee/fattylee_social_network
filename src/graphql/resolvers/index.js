import { postResolver } from "./post.js";
import { userResolver } from "./user.js";

export default {
  ...postResolver,
  ...userResolver,
};
