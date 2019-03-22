import imdb from "../../../src/imdb";
import MovieModel from "../../../models/movie";
import { GraphQLFloat } from "graphql";

const DENZEL_IMDB_ID = "nm0000243";

export default {
  type: GraphQLFloat,
  async resolve() {
    try {
      const movies = await imdb(DENZEL_IMDB_ID);
      await movies.map(async movie => {
        let movieModel = new MovieModel(movie);
        await movieModel.save();
      });
      return movies.length;
    } catch (error) {
      throw new Error(`Error adding movie : ${error}`);
    }
  }
};
