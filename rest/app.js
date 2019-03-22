const Express = require("express");
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");
const imdb = require("../src/imdb");
const DENZEL_IMDB_ID = "nm0000243";

const CONNECTION_URL =
  "mongodb+srv://davidmazi:MotDePasseMongodb%401996@clustertest-mba9f.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "denzelmongoose";

var app = Express();

Mongoose.connect(`${CONNECTION_URL}`, {
  dbName: `${DATABASE_NAME}`,
  useNewUrlParser: true
});

const MovieModel = Mongoose.model("movie", {
  link: String,
  id: String,
  metascore: Number,
  poster: String,
  rating: Number,
  synopsis: String,
  title: String,
  votes: Number,
  year: Number
});

const ReviewModel = Mongoose.model("review", {
  date: String,
  review: String,
  movieId: String
});
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.listen(9292, () => {
  console.log("Listening at 9292...");
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

app.get("/movies", (request, response) => {
  collection
    .aggregate([
      { $match: { metascore: { $gte: 70 } } },
      { $sample: { size: 1 } }
    ])
    .toArray((error, result) => {
      if (error) {
        return response.status(500).send(error);
      }
      response.send(result);
    });
});

app.get("/movies/search", async (request, response) => {
  try {
    var result = await MovieModel.find({
      metascore: { $gte: Number(request.query.metascore) || 0 }
    })
      .sort({ metascore: -1 })
      .limit(Number(request.query.limit) || 5)
      .exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/movies/:id", async (request, response) => {
  try {
    var movie = await MovieModel.find({ id: request.params.id }).exec();
    response.send(movie);
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
