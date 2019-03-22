import { GraphQLString, GraphQLList } from "graphql";
import { reviewType } from "../../types/review";
import reviewModel from "../../../models/review";

export default {
  type: new GraphQLList(reviewType),
  args: {
    movieid: { name: "movieid", type: GraphQLString }
  },
  async resolve(root, params) {
    let reviews = await reviewModel.find({ movieid: params.movieid }).exec();
    if (!reviews) {
      throw new Error("Error searching for review");
    }
    console.log(reviews);
    return reviews;
  }
};
