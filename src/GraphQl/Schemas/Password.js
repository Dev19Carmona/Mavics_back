import { gql } from "graphql-tag";

export const tagTypeDef = gql`
  type Password {
    _id: String
    value: String
    userId: String
    isRemove: String
  }
  input passwordData {
    _id: String
    userId: String
    value: String
  }

  type Query {
    passwords: [Password]
  }
  type Mutation {
    passwordSave(data: passwordData): Tag
  }
`;
