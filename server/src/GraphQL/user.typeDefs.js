// typeDefs.js
const { gql } = require("apollo-server-express");

const userTypeDefs = gql`

type User {
    id: ID!
    name: String!
    email: String!
    username: String!
  }
  
  type AuthPayload {
    user: User
    message: String!
    accessToken: String
  }


  type Mutation {
    registerUser(name: String!, email: String!, username: String!, password: String!): AuthPayload
    loginUser(email: String!, password: String!): AuthPayload
  }

`;

module.exports = { userTypeDefs };