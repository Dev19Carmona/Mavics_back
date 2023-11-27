import { userTypeDef } from "./Schemas/User.js";
import { userResolver } from "./Resolvers/User.js";
import { productTypeDef } from "./Schemas/Product.js";
import { productResolver } from "./Resolvers/Product.js";
import { tagTypeDef } from "./Schemas/Tag.js";
import { tagResolver } from "./Resolvers/Tag.js";
import { supplierTypeDef } from "./Schemas/Supplier.js";
import { supplierResolver } from "./Resolvers/Supplier.js";
import { categoryTypeDef } from "./Schemas/Category.js";
import { categoryResolver } from "./Resolvers/Category.js";
import { sizeTypeDef } from "./Schemas/Size.js";
import { sizeResolver } from "./Resolvers/Size.js";


export const typeDefs = [userTypeDef, productTypeDef, tagTypeDef, supplierTypeDef, categoryTypeDef, sizeTypeDef];
export const resolvers = [userResolver, productResolver, tagResolver, supplierResolver, categoryResolver, sizeResolver];
