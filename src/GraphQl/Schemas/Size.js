import { gql } from "graphql-tag";

export const sizeTypeDef = gql`
  type Size {
    _id: String
    name: String
    isRemove: Boolean
    categories: [Category]
  }
  input sizeData {
    _id: String
    name: String!
    categoryIds: [String]!
    isRemove: Boolean
  }
  input sizeFilter {
    _id: String
    search: String
    categoryIds: [String]
  }

  type Query {
    sizes(filter: sizeFilter): [Size]
    sizeCount(filter: sizeFilter): Int
  }
  type Mutation {
    sizeSave(data: sizeData): Size
    sizeDelete(_id: String): Boolean

  }
`;
