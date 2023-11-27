import { gql } from "graphql-tag";

export const userTypeDef = gql`
  type User {
    _id:String
    name: String
    username: String
    password: String
    email: String
    rol: String
    createdAt:String
    updatedAt:String
    isRemove: Boolean
  }

  enum Roles {
    ADMIN
    SELLER
    BARBER
    BEGINNER
  }

  input userFilter {
    _id:String
    name: String
    username: String
    password: String
    email: String
    rol: String
    isRemove: Boolean
    search:String
  }
  input userData {
    name: String
    username: String
    password: String
    email: String
    rol: Roles
  }

  input Login {
    email: String
    password: String
    googleToken: String
  }

  type Query {
    users(filter:userFilter): [User]
    me: User
  }

  type Mutation {
    userCreate(data: userData): User
    userLogin(filter: Login): String
    userRecoveryPassword(email: String): User
  }
  
`;
