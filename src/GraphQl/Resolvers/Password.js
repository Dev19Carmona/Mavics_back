import Password from "../../Models/Password.js";
import { v4 as uuidv4 } from "uuid";
//----------------------------------QUERIES
const passwords = async (_, __, { session }) => {
  try {
    const { _id: userId } = session

  } catch (error) {
    throw new Error(error);
  }
};

//----------------------------------MUTATIONS
const passwordCreate = async (_, data) => {
  try {
    const { value, userId } = data
    const newPassword = new Password({
      _id: uuidv4(),
      value,
      userId
    })
    await newPassword.save()
  } catch (error) {
    return Promise.reject(error);
  }
};

const passwordUpdate = async (_, data) => {
  try {
    const { value, _id } = data
    const update = { $set: {} }
    if (value) update.$set.value = value
    return await Password.findOneAndUpdate({ _id }, update);

  } catch (error) {
    return Promise.reject(error);
  }
};
const tagSave = async (_, { data }, { session }) => {
  const options = {
    create: tagCreate,
    update: tagUpdate,
  };
  const option = data?._id ? "update" : "create";
  return await options[option](_, data);
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
