import Category from "../../Models/Category.js";
import { v4 as uuidv4 } from "uuid";
//----------------------------------QUERIES

const categories = async (_, { filter = {}, count = false }, { session }) => {
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
    let category = Category.aggregate([]).match(query);
    if (count) {
      category.count("totalCategories");
      return (await category.exec())[0]?.totalCategories ?? 0;
    }
    return await category;
  } catch (error) {
    throw new Error(error);
  }
};
const categoryCount = async (_, { filter = {} }, { session }) => {
  try {
    return await categories(_, { filter, count: true }, { session });
  } catch (e) {
    console.error("\x1b[41m\x1b[30m%s\x1b[0m\x1b[0m", "e", e);
    return e;
  }
};
//----------------------------------MUTATIONS
const categoryCreate = async (_, { data }, session) => {
  const { name } = data;
  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) throw new Error("Ya existe una categoria con este nombre");
    const newCategory = new Category({
      _id: uuidv4(),
      name,
    });

    return await newCategory.save();
  } catch (error) {
    return Promise.reject(error);
  }
};

const categoryUpdate = async (_, { data }, session) => {
  try {
    const { _id, name } = data;
      const update = { $set: {} };
      if (name) update.$set.name = name;

      return await Category.findOneAndUpdate({ _id }, update);
  } catch (error) {
    return error;
  }
};
const categorySave = async (_, { data }, { session }) => {
  const options = {
    create: categoryCreate,
    update: categoryUpdate,
  };
  const option = data?._id ? "update" : "create";
  return await options[option](_, { data }, session);
};

const categoryDelete = async (_, { _id }) => {
  try {
    const category = await Category.findOne({ _id, isRemove: false });
    if (!category) throw new Error("SUPPLIER_NOT_FOUND");
    category.isRemove = true;
    await category.save();
    return true;
  } catch (error) {
    return error;
  }
};
export const categoryResolver = {
  Query: {
    categories,
    categoryCount,
  },
  Mutation: {
    categorySave,
    categoryDelete,
  },
};
