import mongoose from "mongoose";
const collectionName = "Product";

const Schema = new mongoose.Schema(
  {
    _id: { type: String },
    name: { type: String, require: true },
    description: { type: String, default: 'no_description' },
    urlImage: { type: String, default: "no_image" },
    price: { type: Number, require: true },
    tags: { type: Array, default: [{}] },
    supplierId: { type: String },
    categoryId: { type: String },
    sizes: { type: Array, default: [{}] },
    gender: { type: String, enum: ["M","F","U"], default: "U" },
    isAvailable: { type: Boolean },
    isRemove: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    _id: false,
    versionKey:false
  }
);

// Schema.pre("save", function (next) {
//   if (this.amount > 0) {
//     this.isAvailable = true;
//   } else {
//     this.isAvailable = false;
//   }
//   next();
// });

// Schema.pre("findOneAndUpdate", function (next) {
//   const updateData = this.getUpdate();
//   if (updateData.$set.amount > 0) {
//     updateData.$set.isAvailable = true;
//   } else {
//     updateData.$set.isAvailable = false;
//   }
//   next();
// });

export default mongoose.model(collectionName, Schema);
