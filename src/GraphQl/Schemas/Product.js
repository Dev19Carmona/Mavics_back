import { gql } from "graphql-tag";

export const productTypeDef = gql`
  scalar Upload
  type Product {
    _id: String
    name: String
    price: Float
    amount: Int
    isRemove: Boolean
    isAvailable: Boolean
    createdAt: String
    updatedAt: String
    tags: [Tag]
    urlImage: String
    supplierId: String
    supplier: Supplier
  }

  input productFilter {
    _id: String
    name: String
    price: Float
    amount: Int
    isAvailable: Boolean
    isRemove: Boolean
    search: String
  }

  input productData {
    _id: String
    name: String
    price: Float
    amount: Int
    image: Upload
    tags: [tagData]
    isRemove: Boolean
    supplierId: String
  }

  type Query {
    products(filter: productFilter): [Product]
    productCount(filter: productFilter): Int
  }
  type Mutation {
    productSave(data: productData): Product
    Product_delete(_id: String): Product
    DELETE_PRODUCTS: Boolean
  }
`;
