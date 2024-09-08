import mongoose from "mongoose";
import PostModel from "../Models/PostModel.js";
import UserModel from "../Models/UserModel.js";
export const createNewPost = async (req, res) => {
  if (!req.body.userid) {
    return res.status(400).json({
      message: "User ID is required to create a post.",
    });
  }

  try {
    const newPost = new PostModel(req.body);
    await newPost.save();
    res.status(200).json({
      message: "Post added successfully.",
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the post.",
      error: error.message,
    });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  const { userid, postID } = req.body;

  if (!userid || !postID) {
    return res.status(400).json({
      message: "User ID and Post ID are required to edit a post.",
    });
  }

  try {
    const isAvailablePost = await PostModel.findById(postID);

    if (!isAvailablePost) {
      return res.status(404).json({
        message: "Post not available.",
      });
    }

    if (userid !== isAvailablePost.userid.toString()) {
      return res.status(403).json({
        message: "You are not authorized to edit this post.",
      });
    }

    const updatedPost = await PostModel.findByIdAndUpdate(postID, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Post updated successfully.",
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the post.",
      error: error.message,
    });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  const { userid, postID } = req.body;

  if (!userid || !postID) {
    return res.status(400).json({
      message: "User ID and Post ID are required to delete a post.",
    });
  }

  try {
    const isAvailablePost = await PostModel.findById(postID);

    if (!isAvailablePost) {
      return res.status(404).json({
        message: "Post not available.",
      });
    }

    if (userid !== isAvailablePost.userid.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this post.",
      });
    }

    await PostModel.findByIdAndDelete(postID);
    res.status(200).json({
      message: "Post deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the post.",
      error: error.message,
    });
  }
};

// Get post by ID
export const getPostByid = async (req, res) => {
  const { userid, postID } = req.params;

  if (!userid || !postID) {
    return res.status(400).json({
      message: "User ID and Post ID are required to get a post.",
    });
  }

  try {
    const isAvailablePost = await PostModel.findById(postID);

    if (!isAvailablePost) {
      return res.status(404).json({
        message: "Post not available.",
      });
    }

    if (userid !== isAvailablePost.userid.toString()) {
      return res.status(403).json({
        message: "You are not authorized to view this post.",
      });
    }

    res.status(200).json({
      message: "Post fetched successfully.",
      post: isAvailablePost,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the post.",
      error: error.message,
    });
  }
};

// Like And Dislike Post

export const LikeAndDisLikePost = async (req, res) => {
  const { userid, postID } = req.body;
  if (!userid || !postID) {
    return res.status(400).json({
      message: "User ID and Post ID are required to get a post.",
    });
  }
  try {
    const AvailablePost = await PostModel.findById(postID);

    if (!AvailablePost) {
      return res.status(404).json({
        message: "Post not available.",
      });
    }
    if (AvailablePost.likes.includes(userid)) {
      await AvailablePost.updateOne({$pull: { likes: userid }});
      return res.status(200).json({
        message: "Post like.",
        post: AvailablePost,
      });
    } else {
      await AvailablePost.updateOne({$push: { likes: userid }});
      return res.status(200).json({
        message: "Post DisLike.",
        post: AvailablePost,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the post.",
      error: error.message,
    });
  }
};
// get Timeline Posts

export const getTimelinePosts = async (req, res) => {
    const { userid } = req.body;
  
    // Validate input
    if (!userid) {
      return res.status(400).json({
        message: "User ID is required to get timeline posts.",
      });
    }
  
    try {
      const currentUserPosts = await PostModel.find({ userid: userid });
  
      // Fetch the list of users that the current user is following
      const followingUserIds = await UserModel.findById(userid).select('following').lean();
  
      if (followingUserIds) {
            // Fetch posts from users that the current user is following
      const followingUserPosts = await PostModel.find({
        userid: { $in: followingUserIds.following }
      });
  
      // Combine the posts from the current user and followed users
      const timelinePosts = [...currentUserPosts, ...followingUserPosts];
    return  res.status(200).json({
        message: "Timeline posts fetched successfully.",
        posts: timelinePosts,
      });
      }
  
  
      res.status(200).json({
        message: "Timeline posts fetched successfully.",
        posts: currentUserPosts,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching the timeline posts.",
        error: error.message,
      });
    }
  };