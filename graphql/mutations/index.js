import movieMutation from "./movie";
import reviewMutation from "./review";

export default {
  ...movieMutation,
  ...reviewMutation
};
