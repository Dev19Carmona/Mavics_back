import mongoose from "mongoose";
const collectionName = "Password";

const Schema = new mongoose.Schema(
  {
    _id: { type: String },
    value: { type: String, require: true },
    userId: { type: String, require: true },
    isRemove: { type: Boolean, default: false },
    recoveryToken: { type: String },
  },
  {
    timestamps: true,
    _id: false,
    versionKey:false
  }
);

export default mongoose.model(collectionName, Schema);
