import { allUsers } from "../../Constants/_general.js";
import Tag from "../../Models/Tag.js";
import { v4 as uuidv4 } from "uuid";
//----------------------------------QUERIES
const tags = async (_, { filter = {}, count = false }, { session }) => {
  try {
    if (session?.rol && !allUsers().includes(session?.rol))
      throw new Error("YOU_CANT_SEE_TAGS");
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
    let tag = Tag.aggregate([]).match(query);
    if (count) {
      tag.count("totalTags");
      return (await tag.exec())[0]?.totalTags ?? 0;
    }
    return await tag;
  } catch (error) {
    throw new Error(error);
  }
};
const tagCount = async (_, { filter = {} }, { session }) => {
  try {
    return await tags(_, { filter, count: true }, { session });
  } catch (e) {
    console.error("\x1b[41m\x1b[30m%s\x1b[0m\x1b[0m", "e", e);
    return e;
  }
};
//----------------------------------MUTATIONS
const tagCreate = async (_, { data }, session) => {
  const { name } = data;
  try {
    if (session?.rol && session?.rol === "ADMIN") {
      const existingTag = await Tag.findOne({ name });
      if (existingTag) throw new Error("Ya existe un tag con este nombre");
      const newTag = new Tag({
        _id: uuidv4(),
        name,
      });

      return await newTag.save();
    } else {
      return false;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const tagUpdate = async (_, { data }, session) => {
  try {
    const { _id, name } = data;
    if (session?.rol && session?.rol === "ADMIN") {
      const update = { $set: {} };
      if (name) update.$set.name = name;

      return await Tag.findOneAndUpdate({ _id }, update);
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};
const tagSave = async (_, { data }, { session }) => {
  const options = {
    create: tagCreate,
    update: tagUpdate,
  };
  const option = data?._id ? "update" : "create";
  return await options[option](_, { data }, session);
};

export const tagResolver = {
  Query: {
    tags,
    tagCount,
  },
  Mutation: {
    tagSave,
  },
};
