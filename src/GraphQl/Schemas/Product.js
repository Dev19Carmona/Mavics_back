import { gql } from "graphql-tag";

export const productTypeDef = gql`
  scalar Upload
  type Product {
    _id: String
    name: String
    gender:String
    description: String
    price: Float
    isRemove: Boolean
    isAvailable: Boolean
    createdAt: String
    updatedAt: String
    tags: [Tag]
    urlImage: String
    supplierId: String
    supplier: Supplier
    sizes: [productSize]
  }
  type productSize {
    _id: String
    amount: Int
    name: String
  }
  input productSize_Input {
    _id: String
    amount: Int
    name: String
  }

  input productFilter {
    _id: String
    name: String
    price: Float
    isAvailable: Boolean
    isRemove: Boolean
    search: String
  }

  input productData {
    _id: String
    name: String
    description: String
    image: Upload
    price: Float
    supplierId: String
    categoryId: String
    sizes: [productSize_Input]
    gender: String
    isRemove: Boolean
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
