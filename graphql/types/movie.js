import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLList
} from "graphql";

import { reviewType } from "./review";

export const movieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    link: { type: GraphQLString },
    id: { type: GraphQLString, unique: true },
    metascore: { type: GraphQLFloat },
    reviewer: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    synopsis: { type: GraphQLString },
    title: { type: GraphQLString },
    votes: { type: GraphQLID },
    year: { type: GraphQLFloat },
    review: { type: new GraphQLList(reviewType) }
  })
});

export const movieInputType = new GraphQLInputObjectType({
  name: "MovieInput",
  fields: () => ({
    link: { type: GraphQLString },
    id: { type: GraphQLString, unique: true },
    metascore: { type: GraphQLFloat },
    reviewer: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    synopsis: { type: GraphQLString },
    title: { type: GraphQLString },
    votes: { type: GraphQLID },
    year: { type: GraphQLFloat },
    reviews: { type: GraphQLString }
  })
});
