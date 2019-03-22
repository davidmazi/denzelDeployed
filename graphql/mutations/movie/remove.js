import { GraphQLNonNull, GraphQLID } from "graphql";

import { movieType } from "../../types/movie";
import MovieModel from "../../../models/movie";

export default {
  type: movieType,
  args: {
    id: {
      name: "id",
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params) {
    const removedMovie = MovieModel.findByIdAndRemove(params.id).exec();
    if (!removedMovie) {
      throw new Error("Error removing movie");
    }
    return removedMovie;
  }
};
