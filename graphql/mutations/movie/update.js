import { GraphQLNonNull, GraphQLID } from "graphql";

import { movieType, movieInputType } from "../../types/movie";
import MovieModel from "../../../models/movie";

export default {
  type: movieType,
  args: {
    id: {
      name: "ID",
      type: new GraphQLNonNull(GraphQLID)
    },
    data: {
      name: "data",
      type: new GraphQLNonNull(movieInputType)
    }
  },
  resolve(root, params) {
    return MovieModel.findByIdAndUpdate(
      params.id,
      { $set: { ...params.data } },
      { new: true }
    ).catch(err => new Error("Couldn't Update Movie data, ", err));
  }
};
