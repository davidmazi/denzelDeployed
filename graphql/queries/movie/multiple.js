import { GraphQLList } from "graphql";
import { movieType } from "../../types/movie";
import movieModel from "../../../models/movie";

export default {
  type: new GraphQLList(movieType),
  resolve() {
    const movies = movieModel.find().exec();
    if (!movies) {
      throw new Error("Error getting movies");
    }
    return movies;
  }
};
