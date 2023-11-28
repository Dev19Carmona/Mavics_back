import mongoose from "mongoose";
const collectionName = "Size";

const Schema = new mongoose.Schema(
  {
    _id: { type: String },
    name: { type: String, require: true },
    categoryIds: { type: Array, require: true },
    isRemove: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    _id: false,
    versionKey:false
  }
);


export default mongoose.model(collectionName, Schema);
