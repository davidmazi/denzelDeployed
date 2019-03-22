import express from "express";
import graphqlHTTP from "express-graphql";
import mongoose from "mongoose";
import movieModel from "./models/movie";
import reviewModel from "./models/review";
import schema from "./graphql";

require("dotenv").config();

const CONNECTION_URL = `${process.env.DB_URL}`;
const DATABASE_NAME = `TutorialDenzelMovie`;
const PORT = `9292`;

const app = express();

mongoose.connect(`${CONNECTION_URL}`, {
  dbName: `${DATABASE_NAME}`,
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", error =>
  console.log(`Failed to connect to DB.\n ${error}`)
).once("open", () => console.log("Connected to DB. "));

app.get("/", (req, res) => {
  res.send("Hello World..");
});

// GraphQL API
app.use(
  "/graphql",
  graphqlHTTP(() => ({
    schema,
    graphiql: true,
    pretty: true
  }))
);

app.listen(PORT, () => {
  console.log(`GraphQL and REST server running at port ${PORT}...`);
});

app.get("/movies/populate", async (request, response) => {
  try {
    const movies = await imdb(DENZEL_IMDB_ID);
    await movies.map(async movie => {
      var movieModel = new MovieModel(movie);
      await movieModel.save();
    });
    response.send(
      `Added ${movies.length} movies to the ${DATABASE_NAME} database`
    );
  } catch (error) {
    response.status(500).send(error);
  }
});

async function getReviewsOfMovie(movie) {
  console.log(movie);
  let reviews = await reviewModel.find({ movieid: movie.id }).exec();
  return reviews;
}

app.get("/movies/search", async (request, response) => {
  try {
    var result = await movieModel
      .find({
        metascore: { $gte: Number(request.query.metascore) || 0 }
      })
      .sort({ metascore: -1 })
      .limit(Number(request.query.limit) || 5)
      .exec();

    var reviews = [];
    result.map(movie => {
      reviews.push(movie);
    });
    console.log(reviews);
    response.send({ Movie: result, Reviews: reviews });
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/movies", async (request, response) => {
  const movies = await movieModel.find({ metascore: { $gte: 79 } }).exec();
  if (!movies) {
    throw new Error("Error getting must-watch movies");
  }

  const randomMovie = movies[Math.floor(Math.random() * movies.length)];

  const reviews = await getReviewsOfMovie(randomMovie);

  response.send({ Movie: randomMovie, Reviews: reviews });
});

app.get("/movies/:id", async (request, response) => {
  try {
    const movie = await movieModel.findOne({ id: request.params.id }).exec();

    const reviews = await getReviewsOfMovie(movie);

    response.send({ Movie: movie, Reviews: reviews });
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/movies/:id", async (request, response) => {
  try {
    var review = new ReviewModel({
      date: request.body.date,
      review: request.body.review,
      movieId: request.params.id
    });
    var result = await review.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
