import mongoose from "mongoose";
mongoose.Promise = Promise;

const Schema = mongoose.Schema;

const moviesSchema = new Schema(
  {
    link: String,
    id: { type: String, unique: true },
    metascore: Number,
    reviewer: String,
    rating: Number,
    synopsis: String,
    title: String,
    votes: Number,
    year: Number
  },
  { collection: "movies", timestamps: true }
);

export default mongoose.model("movies", moviesSchema);
