const Post = require("../models/post.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");
// const uploadoncloudinary = require("../utils/upload");
const {deleteFromCloudinary,uploadoncloudinary} = require("../utils/upload");
const Likes = require("../models/likes.model");
const mongoose = require("mongoose");

const posts = async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  let postimage = req?.file?.path;
  let coverImage = "";
  if (postimage != undefined) {
    coverImage = await uploadoncloudinary(postimage);
  }

  const post = await new Post({
    picture: req?.file?.filename ?? "",
    path: coverImage?.url ?? null,
    user: user._id,
    caption: req.body.caption,
    pictureID: coverImage?.public_id ?? null,
  });
  await post.save();
  user.posts.push(post._id);
  await user.save();
  res.send({ success: true, user });
};



const comment = async (req, res) => {
  const user = await User.findById(req.user);
  const post = await Post.findById(req.params.id);
  const comment = await new Comment({
    user: user._id,
    post: post._id,
    content: req.body.content,
  });
  await comment.save();
  post.comments.push(comment._id);
  await post.save();
  res.send({ success: true, post });
};

const like = async (req, res) => {
  const user = await User.findById(req.user);
  const post = await Post.findById(req.params.id);
  const like = await new Likes({
    user: user._id,
    post: post._id,
  });
  await like.save();
  post.likes.push(like._id);
  await post.save();
  res.send({ success: true, post });
};

const dislike = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user; // Assuming you have the user ID in the request

    // Check if the post exists
    const existingLike = await Likes.findOneAndDelete({
      user: userId,
      post: postId,
    });

    if (!existingLike) {
      return res
        .status(404)
        .json({ success: false, message: "Post not liked by the user" });
    }

    // Remove the like
    await Likes.deleteOne({ user: userId, post: postId });

    res
      .status(200)
      .json({ success: true, message: "Post disliked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getcomments = async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("user")
    .populate({model: "Comment", path: "comments", populate: {path: "user"}});
  res.send({ success: true, post });
};

const getposts = async (req, res) => {
  const posts = await Post.find().populate("user");
  res.send({ success: true, posts });
};

const getUserLike = async (req, res) => {
  try {
    const postid = req?.params?.id;
    if (!postid || !mongoose.Types.ObjectId.isValid(postid)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid post ID" });
    }

    const post = await Post.findById(postid);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // Check if the post is liked by the user
    const isLikedByUser = await Likes.exists({
      user: req.user,
      post: post._id,
    });
    const status = isLikedByUser ? true : false;
    res.status(200).json({ success: true, status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deletePostWithComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user; // Assuming you have the user ID in the request
    // Check if the post exists and is owned by the user
    const post = await Post.findOne({ _id: postId, user: userId });

    if (!post) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Post not found or not owned by the user",
        });
    }
    if(post.pictureID){
      await deleteFromCloudinary(post.pictureID);
    }
    // Delete the post
    await Post.deleteOne({ _id: postId, user: userId });

    // Delete comments associated with the post
    await Comment.deleteMany({ post: postId });

    res
      .status(200)
      .json({
        success: true,
        message: "Post and associated comments deleted successfully",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getUserPost = async (req, res) => {
  const posts = await Post.find({ user: req.user }).populate("user");
  res.send({ success: true, posts });
};

const editPost = async (req, res) => {
  try {
    const postId = req.params.id; // Assuming post ID is passed in the request parameters


    // Update the post properties based on the request data
    let updateFields = {};

    if (req.file) {
      const postimage = req.file.path;
      const coverImage = await uploadoncloudinary(postimage);
      updateFields.picture = req.file.filename;
      updateFields.path = coverImage.url || null;
    }

    if (req.body.caption) {
      updateFields.caption = req.body.caption;
    }

    // Find the post to be edited and check ownership
    const post = await Post.findOneAndUpdate(
      { _id: postId, user: req.user }, // Only update if the post belongs to the user
      updateFields,
      { new: true } // Return the updated document
    );

    if (!post) {
      return res.status(404).send({ success: false, message: "Post not found or you are not authorized to edit this post" });
    }

    res.send({ success: true, message: "Post updated successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};



module.exports = {
  posts,
  getcomments,
  comment,
  getposts,
  like,
  getUserLike,
  dislike,
  deletePostWithComments,
  getUserPost,
  editPost,
};
