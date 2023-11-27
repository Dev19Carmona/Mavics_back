////@ts-check
/// <reference path="../../jsdocs/typeDefs.js" /> // Para usar las definiciones JSDocs
/// <reference path="../../jsdocs/Supplier.js" /> // Para usar las definiciones JSDocs
import Supplier from "../../Models/Supplier.js";
import { v4 as uuidv4 } from "uuid";
//----------------------------------QUERIES
/**
 *
 * @param {*} _ Parent
 * @param {SecondParamFilterSupplier} param1 Filter and Count
 * @param {ThirdParamSession} param2 Session
 * @returns {Promise<Supplier[]>} Suppliers
 */
const suppliers = async (_, { filter = {}, count = false }, { session }) => {
  try {
    let query = { isRemove: false };
    if (filter) {
      const { search } = filter;
      for (let data in filter) {
        if (Object.hasOwnProperty.call(filter, data)) {
          let element = filter[data];
          if (data === "search") {
            const like = { $regex: search, $options: "i" };
            data = "$or";
            element = [{ name: like }];
          }
          query[data] = element;
        }
      }
    }
    let supplier = Supplier.aggregate([]).match(query);
    if (count) {
      supplier.count("totalSuppliers");
      return (await supplier.exec())[0]?.totalSuppliers ?? 0;
    }
    return await supplier;
  } catch (error) {
    throw new Error(error);
  }
};
/**
 *
 * @param {*} _ Parent
 * @param {SecondParamFilterSupplier} param1 Filter and Count
 * @param {ThirdParamSession} param2 Session
 * @returns {Promise<number|Supplier[]>} Supplier_Count
 */
const supplierCount = async (_, { filter = {} }, { session }) => {
  try {
    return await suppliers(_, { filter, count: true }, { session });
  } catch (e) {
    console.error("\x1b[41m\x1b[30m%s\x1b[0m\x1b[0m", "e", e);
    return e;
  }
};
//----------------------------------MUTATIONS
/**
 *
 * @param {*} _ Parent
 * @param {SecondParamSaveSupplier} param1 Data
 * @param {Session} session Session
 * @returns {Promise<Supplier|boolean>} Supplier
 */
const supplierCreate = async (_, { data }, session) => {
  const { name, phone, nit, manager } = data;
  try {
    const existingSupplier = await Supplier.findOne({ name });
    if (existingSupplier) throw new Error("Ya existe un tag con este nombre");
    const newSupplier = new Supplier({
      _id: uuidv4(),
      name,
      phone,
      nit,
      manager,
    });

    return await newSupplier.save();
  } catch (error) {
    return Promise.reject(error);
  }
};
/**
 *
 * @param {*} _ Parent
 * @param {SecondParamSaveSupplier} param1 Data
 * @param {Session} session Session
 * @returns {Promise<Supplier|boolean>} Supplier
 */
const supplierUpdate = async (_, { data }, session) => {
  try {
    const { _id, name, phone, nit, manager } = data;
    const update = { $set: {} };
    if (name) update.$set.name = name;
    if (phone) update.$set.phone = phone;
    if (nit) update.$set.nit = nit;
    if (manager) update.$set.manager = manager;

    return await Supplier.findOneAndUpdate({ _id }, update);
  } catch (error) {
    return error;
  }
};
/**
 *
 * @param {*} _ Parent
 * @param {SecondParamSaveSupplier} param1 Data
 * @param {ThirdParamSession} session Session
 * @returns {Promise<Supplier|boolean>} Product
 */
const supplierSave = async (_, { data }, { session }) => {
  const options = {
    create: supplierCreate,
    update: supplierUpdate,
  };
  const option = data?._id ? "update" : "create";
  return await options[option](_, { data }, session);
};
/**
 *
 * @param {*} _ Parent
 * @param {SecondParamDelete} param1
 * @returns {Promise<boolean>}
 */
const supplierDelete = async (_, { _id }) => {
  try {
    const supplier = await Supplier.findOne({ _id, isRemove: false });
    if (!supplier) throw new Error("SUPPLIER_NOT_FOUND");
    supplier.isRemove = true;
    await supplier.save();
    return true;
  } catch (error) {
    return error;
  }
};
export const supplierResolver = {
  Query: {
    suppliers,
    supplierCount,
  },
  Mutation: {
    supplierSave,
    supplierDelete,
  },
};
