import { GraphQLNonNull } from "graphql";

import { movieType, movieInputType } from "../../types/movie";
import MovieModel from "../../../models/movie";

export default {
  type: movieType,
  args: {
    data: {
      name: "data",
      type: new GraphQLNonNull(movieInputType)
    }
  },
  resolve(root, params) {
    const movieModel = new MovieModel(params.data);
    const newMovie = movieModel.save();
    if (!newMovie) {
      throw new Error("Error adding movie");
    }
    return newMovie;
  }
};
