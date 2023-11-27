import mongoose from "mongoose";
const collectionName = "Supplier";

const Schema = new mongoose.Schema(
  {
    _id: { type: String },
    name: { type: String, require: true },
    phone: { type: String },
    nit: { type: String },
    manager: { type: String },
    isActive: { type: Boolean, default: true },
    isRemove: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    _id: false,
    versionKey:false
  }
);


export default mongoose.model(collectionName, Schema);
