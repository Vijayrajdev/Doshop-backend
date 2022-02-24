import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  listPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  compatibleWith: [
    {
      type: String,
    },
  ],
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
  imageUrl: {
    type: String,
  },
  stock: {
    type: Number,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: "reviews",
    },
  ],
});

const ProductModel = mongoose.model(ProductSchema);

export default ProductModel;
