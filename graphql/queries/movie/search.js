import { movieType, movieInputType } from "../../types/movie";
import movieModel from "../../../models/movie";
import reviewModel from "../../../models/review";
import { GraphQLList, GraphQLFloat, GraphQLString } from "graphql";

export default {
  type: new GraphQLList(movieType),
  args: {
    title: { name: "title", type: GraphQLString },
    metascore: { name: "metascore", type: GraphQLFloat },
    limit: { limit: "limit", type: GraphQLFloat }
  },
  async resolve(root, params) {
    const movieTitle = params.title ? params.title : "\\(";
    let movies = await movieModel
      .find({
        title: { $regex: `.*${movieTitle}.*`, $options: "i" },
        metascore: { $gte: Number(params.metascore) || 0 }
      })
      .sort({ metascore: -1 })
      .limit(Number(params.limit) || 5)
      .exec();
    if (!movies) {
      throw new Error("Error searching movies");
    }

    async function getReviewsOfMovie(movie) {
      let reviews = await reviewModel.find({ movieid: movie.id });
      return reviews;
    }

    let totalReviews = await Promise.all(
      movies.map(async movie => {
        return getReviewsOfMovie(movie);
      })
    );

    for (let i = 0; i < movies.length; i++) {
      movies[i].review = totalReviews[i];
    }
    // console.log(reviews);
    return movies;
  }
};
