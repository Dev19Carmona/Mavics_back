import { userTypeDef } from "./Schemas/User.js";
import { userResolver } from "./Resolvers/User.js";
import { productTypeDef } from "./Schemas/Product.js";
import { productResolver } from "./Resolvers/Product.js";
import { tagTypeDef } from "./Schemas/Tag.js";
import { tagResolver } from "./Resolvers/Tag.js";
import { supplierTypeDef } from "./Schemas/Supplier.js";
import { supplierResolver } from "./Resolvers/Supplier.js";

export const typeDefs = [userTypeDef, productTypeDef, tagTypeDef, supplierTypeDef];
export const resolvers = [userResolver, productResolver, tagResolver, supplierResolver];
