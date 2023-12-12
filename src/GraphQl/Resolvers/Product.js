////@ts-check
/// <reference path="../../jsdocs/typeDefs.js" /> // Para usar las definiciones JSDocs
/// <reference path="../../jsdocs/Product.js" /> // Para usar las definiciones JSDocs
import Product from "../../Models/Product.js";
import { v4 as uuidv4 } from "uuid";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { tagResolver } from "./Tag.js";
import { Image_Save } from "../../../config/imageSave.js";
import cloudinary from "cloudinary";
import { allUsers, userTypes } from "../../Constants/_general.js";
//----------------------------------QUERIES
/**
 * Query Products
 * @param {*} _ Parent
 * @param {SecondParamFilterProduct} param1 Filter and Count
 * @param {ThirdParamSession} param2 Session
 * @returns {Promise<Product[]>} Products
 */
const products = async (_, { filter = {}, count = false }, { session }) => {
  try {
    if (session?.rol && !allUsers().includes(session?.rol))
      throw new Error("YOU_CANT_SEE_PRODUCTS");
    const { name } = filter;
    /**
     * @type{Product_QueryObject}
     */
    let query = { isRemove: false };

    if (name && name.trim() !== "") {
      const { name } = filter;
      query.name = { $regex: name, $options: "i" };
    }

    let product = Product.aggregate([])
      .match(query)
      .lookup({
        from: "suppliers",
        localField: "supplierId",
        foreignField: "_id",
        as: "supplier",
      })
      .unwind({ path: "$supplier", preserveNullAndEmptyArrays: true });
    if (count) {
      product.count("totalProducts");
      const count = (await product.exec())[0]?.totalProducts ?? 0;
      return count;
    }

    return await product;
  } catch (error) {
    throw new Error(error);
  }
};
/**
 *
 * @param {*} _ Parent
 * @param {SecondParamFilterProduct} param1 Filter and Count
 * @param {ThirdParamSession} param2 Session
 * @returns {Promise<number|Product[]>} Product_Count
 */
const productCount = async (_, { filter, count = true }, { session }) => {
  try {
    return await products(_, { filter, count }, { session });
  } catch (e) {
    console.error("\x1b[41m\x1b[30m%s\x1b[0m\x1b[0m", "e", e);
    return e;
  }
};
//----------------------------------MUTATIONS
/**
 *
 * @param {*} _ Parent
 * @param {SecondParamSaveProduct} param1 Data
 * @param {Session} session Session
 * @returns {Promise<Product|boolean>} Product
 */
const productCreate = async (_, { data }, session) => {
  
  try {
    const { name, description, price, image, supplierId, categoryId, sizes = [], gender } =
      data;
      let urlImage;
      if (image) {
        const newImage = await Image_Save(image, "products");
        urlImage = newImage.secure_url;
      }
      
      const newProduct = new Product({
        _id: uuidv4(),
        name,
        description,
        urlImage,
        price,
        supplierId,
        categoryId,
        sizes,
        gender,
      });
      return await newProduct.save();
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param {*} _ Parent
 * @param {SecondParamSaveProduct} param1 Data
 * @param {Session} param2 Session
 * @returns {Promise<Product|boolean>} Product
 */

const productUpdate = async (_, { data }, session) => {
  try {
    const { _id, name, description, price, tags, image, supplierId, gender } = data
    const update = { $set: {} }
    if (image) {
      const newImage = await Image_Save(image, 'products')
      update.$set.urlImage = newImage.secure_url
    }
    if (name) update.$set.name = name
    if (gender) update.$set.gender = gender
    if (description) update.$set.description = description
    if (price) update.$set.price = price
    if (supplierId) update.$set.supplierId = supplierId
    if (tags && Array.isArray(tags) && tags.length > 0)
      update.$addToSet = { tags: { $each: tags } }

    return await Product.findOneAndUpdate({ _id }, update)
  } catch (error) {
    return error
  }
}
/**
 *
 * @param {*} _ Parent
 * @param {SecondParamSaveProduct} param1 Data
 * @param {ThirdParamSession} param2 Session
 * @returns {Promise<Product|boolean>} Product
 */
const productSave = async (_, { data }, { session }) => {
  const options = {
    create: productCreate,
    update: productUpdate,
  };
  const option = data._id ? "update" : "create";
  return await options[option](_, { data }, session);
};
/**
 *
 * @param {*} _ Parent
 * @param {SecondParamDelete} param1 SecondParamDeleteProduct
 * @returns {Promise<boolean>}  True or False
 */
const Product_delete = async (_, { _id }) => {
  try { 
    const product = await Product.findOne({ _id, isRemove: false });
    
    if (!product) throw new Error("PRODUCT_NOT_FOUND");
    if (product.urlImage !== "no_image") {
      const publicId = product.urlImage.match(/\/v\d+\/(\w+\/\w+)\./)[1];
      await cloudinary.uploader.destroy(publicId);
    }
    product.isRemove = true;
    return await product.save();
  } catch (error) {
    return error;
  }
};

const DELETE_PRODUCTS = async (_, __, { session }) => {
  try {
    if (session?.rol && session?.rol === userTypes.admin.key) {
      await Product.deleteMany({});
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const productResolver = {
  Query: {
    products,
    productCount,
  },
  Mutation: {
    productSave,
    Product_delete,
    DELETE_PRODUCTS,
  },
  Upload: GraphQLUpload,
};
