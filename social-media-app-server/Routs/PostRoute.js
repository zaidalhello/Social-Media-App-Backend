import express from "express";
import {
  createNewPost,
  deletePost,
  getPostByid,
  getTimelinePosts,
  LikeAndDisLikePost,
  updatePost,
} from "../controller/PostControllor.js";

const PostRoute = express.Router();
PostRoute.get("/posts/:userid/:postID", getPostByid);
PostRoute.post("/CreatNewPost", createNewPost);
PostRoute.put("/updatePost", updatePost);
PostRoute.delete("/deletePost", deletePost);
PostRoute.post("/LikeAndDisLikePost", LikeAndDisLikePost);
PostRoute.post("/getTimelinePosts", getTimelinePosts);
export default PostRoute;
