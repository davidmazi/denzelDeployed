import mongoose from "mongoose";
mongoose.Promise = Promise;

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    movieid: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: String, required: true }
  },
  { collection: "reviews", timestamps: true }
);

export default mongoose.model("reviews", reviewSchema);
