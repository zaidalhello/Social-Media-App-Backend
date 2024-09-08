import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    desc: String,
    likes: [],
    image: String,
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
