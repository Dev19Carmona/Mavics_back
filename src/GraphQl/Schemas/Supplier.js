import { gql } from "graphql-tag";

export const supplierTypeDef = gql`
  type Supplier {
    _id: String
    name: String
    phone: String
    nit: String
    manager: String
    isActive: Boolean
    isRemove: Boolean
  }
  input supplierData {
    _id: String
    name: String
    phone: String
    nit: String
    manager: String
  }
  input supplierFilter {
    _id: String
    name: String
    search: String
  }

  type Query {
    suppliers(filter: supplierFilter): [Supplier]
    supplierCount(filter: supplierFilter): Int
  }
  type Mutation {
    supplierSave(data: supplierData): Supplier
    supplierDelete(_id: String): Boolean
  }
`;
