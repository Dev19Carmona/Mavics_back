import Size from "../../Models/Size.js";
import { v4 as uuidv4 } from "uuid";
//----------------------------------QUERIES
const sizes = async (_, { filter = {}, count = false }, { session }) => {
  try {
    let query = { isRemove: false };
    if (filter) {
      const { search, categoryIds } = filter;
      for (let data in filter) {
        if (Object.hasOwnProperty.call(filter, data)) {
          let element = filter[data];
          if (data === "search") {
            const like = { $regex: search, $options: "i" };
            data = "$or";
            element = [{ name: like }];
          }
          if (data === "categoryIds"){
            element = {$all:categoryIds}
          }
          query[data] = element;
        }
      }
    }
    let size = Size.aggregate([]).match(query);

    size.lookup({
      from: 'categories',
      localField: 'categoryIds',
      foreignField: '_id',
      as: 'categories'
    })

    if (count) {
      size.count("totalSizes");
      return (await size.exec())[0]?.totalSizes ?? 0;
    }
    return await size;
  } catch (error) {
    throw new Error(error);
  }
};
const sizeCount = async (_, { filter = {} }, { session }) => {
  try {
    return await sizes(_, { filter, count: true }, { session });
  } catch (e) {
    console.error("\x1b[41m\x1b[30m%s\x1b[0m\x1b[0m", "e", e);
    return e;
  }
};
//----------------------------------MUTATIONS
const sizeCreate = async (_, { data }, session) => {
  const { name, categoryIds } = data;
  try {
    const existingSize = await Size.findOne({ name });
    if (existingSize) throw new Error("Ya existe una talla con este nombre");
    const newSize = new Size({
      _id: uuidv4(),
      name,
      categoryIds,
    });

    return await newSize.save();
  } catch (error) {
    return Promise.reject(error);
  }
};

const sizeUpdate = async (_, { data }, session) => {
  try {
    const { _id, name, categoryIds } = data;
    const update = { $set: {} };
    if (name) update.$set.name = name;
    if (categoryIds.length > 0 && Array.isArray(categoryIds)) update.$set.categoryId = categoryIds;

    return await Size.findOneAndUpdate({ _id }, update);
  } catch (error) {
    return error;
  }
};
const sizeSave = async (_, { data }, { session }) => {
  const options = {
    create: sizeCreate,
    update: sizeUpdate,
  };
  const option = data?._id ? "update" : "create";
  return await options[option](_, { data }, session);
};
const sizeDelete = async (_, { _id }) => {
  try {
    const size = await Size.findOne({ _id, isRemove: false });
    if (!size) throw new Error("SIZE_NOT_FOUND");
    size.isRemove = true;
    await size.save();
    return true;
  } catch (error) {
    return error;
  }
};
export const sizeResolver = {
  Query: {
    sizes,
    sizeCount,
  },
  Mutation: {
    sizeSave,
    sizeDelete
  },
};
