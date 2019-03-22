import { GraphQLString } from "graphql";
import { movieType } from "../../types/movie";
import movieModel from "../../../models/movie";
import reviewModel from "../../../models/review";

export default {
  type: movieType,
  args: {
    id: {
      name: "id",
      type: GraphQLString
    }
  },
  async resolve(root, params) {
    const movie = await movieModel.findOne({ id: params.id }).exec();
    if (!movie) {
      throw new Error("Error getting specific movie");
    }

    async function getReviewsOfMovie(movie) {
      let reviews = await reviewModel.find({ movieid: movie.id });
      return reviews;
    }
    movie.review = await getReviewsOfMovie(movie);

    return movie;
  }
};
