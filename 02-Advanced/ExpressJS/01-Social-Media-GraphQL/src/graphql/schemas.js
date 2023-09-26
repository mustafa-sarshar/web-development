const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  buildSchema,
} = require("graphql");

module.exports = buildSchema(`
  type User {
      _id: ID!
      username: String!
      email: String!
      password: String
      status: String!
      posts: [Post!]!
    }

  type Post {
      _id: ID!
      title: String!
      content: String!
      imageUrl: String!
      author: User!,
      createdAt: String!,
      updatedAt: String!
    }

  input InputUserSignUp {
    username: String!
    email: String!
    password: String!
  }

  type RootMutation {
    createUser(credentials: InputUserSignUp): User!
  }

  type RootQuery {
    greet: String!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

// module.exports = new GraphQLSchema({
//   types: new GraphQL
//   query: new GraphQLObjectType({
//     name: "Query",
//     fields: {
//       name: { type: GraphQLString },
//       greet: {
//         type: GraphQLString,
//         resolve: (obj) => resolvers.greet(obj),
//       },
//     },
//   }),
// });
