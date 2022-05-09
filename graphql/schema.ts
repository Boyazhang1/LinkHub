import { gql } from 'apollo-server-micro';
// query: finding data
// mutation: create, update, delete
// ! means not nullable

export const typeDefs = gql`
  type Edge {
    cursor: String
    node: Link
  }

  type Link {
    id: String
    title: String
    description: String
    url: String
    imageUrl: String
    category: String
    userId: Int
    index: Int
  }

  type LinkConnection {
    edges: [LinkEdge]
    pageInfo: PageInfo!
  }

  type LinkEdge {
    cursor: String!
    node: Link
  }

  type Query {
    links(after: String, before: String, first: Int, last: Int): LinkConnection
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean
    startCursor: String
  }

  enum Role {
    ADMIN
    USER
  }

  type User {
    bookmarks: [Link]
    email: String
    id: String
    image: String
    name: String
    role: Role
  }

  type Mutation {
    deleteLink: Link
  }
`;
