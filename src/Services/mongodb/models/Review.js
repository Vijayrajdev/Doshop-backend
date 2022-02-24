import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  authorName: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

const ReviewModel = mongoose.model(ReviewSchema);

export default ReviewModel;
