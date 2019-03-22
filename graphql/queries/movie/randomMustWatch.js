import { movieType } from "../../types/movie";
import movieModel from "../../../models/movie";
import reviewModel from "../../../models/review";

export default {
  type: movieType,
  async resolve() {
    let movies = await movieModel.find({ metascore: { $gte: 70 } }).exec();
    if (!movies) {
      throw new Error("Error getting must-watch movies");
    }
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];

    async function getReviewsOfMovie(movie) {
      let reviews = await reviewModel.find({ movieid: movie.id });
      return reviews;
    }
    randomMovie.review = await getReviewsOfMovie(randomMovie);

    return randomMovie;
  }
};
