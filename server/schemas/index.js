import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String
    authoredLorePages: [LorePage]
  }

  type LorePage {
    id: ID!
    title: String
    content: String
    published: Boolean
    author: User!
  }

  type Query {
    getLorePage(id: ID): LorePage
    getLorePages: [LorePage!]!
    getUser(id: ID, name: String!): User
    getUsers: [User!]!
  }

  type Mutation {
    createLorePage(
      title: String
      content: String
      published: Boolean
      authorId: String!
    ): LorePage
  }
`;
