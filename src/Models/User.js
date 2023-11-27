import mongoose from "mongoose";
const collectionName = "User";

const Schema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    name: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
    },
    fullName: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
    },
    rol: {
      type: String,
    },
    modules: {
      products: { type: Boolean, default: false },
      tags: { type: Boolean, default: false },
      suppliers: { type: Boolean, default: false },
    },
    isRemove: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    _id: false,
    versionKey: false,
  }
);

export default mongoose.model(collectionName, Schema);
