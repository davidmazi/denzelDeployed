import { GraphQLString } from "graphql";

import { reviewType } from "../../types/review";
import ReviewModel from "../../../models/review";

export default {
  type: reviewType,
  args: {
    movieid: { name: "movieid", type: GraphQLString },
    body: { name: "body", type: GraphQLString }
  },
  resolve(root, params) {
    const rModel = new ReviewModel({
      movieid: params.movieid,
      body: params.body,
      date: new Date().toLocaleString()
    });
    const newReview = rModel.save();
    if (!newReview) {
      throw new Error("Error adding review");
    }
    return newReview;
  }
};
