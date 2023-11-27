import { gql } from "graphql-tag";

export const categoryTypeDef = gql`
  type Category {
    _id: String
    name: String
    isRemove: Boolean
  }
  input categoryData {
    _id: String
    name: String
    isRemove: Boolean
  }
  input categoryFilter {
    _id: String
    name: String
    search: String
  }

  type Query {
    categories(filter: categoryFilter): [Category]
    categoryCount(filter: categoryFilter): Int
  }
  type Mutation {
    categorySave(data: categoryData): Category
    categoryDelete(_id: String): Boolean
  }
`;
