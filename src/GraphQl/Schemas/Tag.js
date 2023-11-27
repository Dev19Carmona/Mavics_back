import { gql } from "graphql-tag";

export const tagTypeDef = gql`
  type Tag {
    _id: String
    name: String
    isRemove: Boolean
  }
  input tagData {
    _id: String
    name: String
    isRemove: Boolean
  }
  input tagFilter {
    _id: String
    search: String
  }

  type Query {
    tags(filter: tagFilter): [Tag]
    tagCount(filter: tagFilter): Int
  }
  type Mutation {
    tagSave(data: tagData): Tag
  }
`;
