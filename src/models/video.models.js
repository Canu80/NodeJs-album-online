import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    duration: String,
    thumbnailUrl: String
  });

const videoModels = mongoose.model("Video", videoSchema);

export default videoModels;
