const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const Follower = require("../models/Follower.model");
const mongoose = require("mongoose");
const Post = require("../models/post.model");
const {uploadoncloudinary} = require("../utils/upload");

const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      username,
      email,
      password: hash,
    });
    const accessToken = await user.generateAuthToken();
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
    res.status(200).cookie("accessToken", accessToken, options).json({
      success: true,
      message: "User register successfully.",
      userExist,
      token: accessToken,
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      res.status(400).json({ message: "Invalid Credentials." });
    }
    const user = await bcrypt.compare(password, userExist.password);
    const accessToken = await userExist.generateAuthToken();
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
    if (user) {
      res.status(200).cookie("accessToken", accessToken, options).json({
        success: true,
        message: "User login successfully",
        userExist,
        token: accessToken,
      });
    } else {
      res.status(401).json({ message: "Invalid email and password." });
    }
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.user),
        },
      },
      {
        $lookup: {
          from: "followers",
          localField: "_id",
          foreignField: "following",
          as: "follower",
        },
      },
      {
        $lookup: {
          from: "followers",
          localField: "_id",
          foreignField: "follower",
          as: "following",
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "user",
          as: "posts",
        },
      },
      {
        $addFields: {
          followerCount: {
            $size: "$follower",
          },
          followingCount: {
            $size: "$following",
          },
          postCount: {
            $size: "$posts",
          },
        },
      },
      {
        $project: {
          password: 0,
          email: 0,
          createdAt: 0,
          updatedAt: 0,
          followers: 0,
          following: 0,
          follower: 0,
          posts: 0,
          __v: 0,
        },
      },
    ]);
    const post = await Post.find({ user: req.user });
    const posts = post.filter((post) => post.path != null);
    res.status(200).json({ user, posts });
  } catch (error) {
    res.status(401).json({ message: "Invalid email and password." });
  }
};

const logout = async (req, res) => {
  await User.findById(
    req.user
  );
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  return (
    res
      .status(200)
      .clearCookie("accessToken", options)
      // .clearCookie("refreshToken", options)
      .json({
        message: "User logout successfully.",
      })
  );
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.aggregate([
      {
        $lookup: {
          from: "followers",
          localField: "_id",
          foreignField: "following",
          as: "follower",
        },
      },
      {
        $lookup: {
          from: "followers",
          localField: "_id",
          foreignField: "follower",
          as: "following",
        },
      },
      {
        $addFields: {
          isfollowed: {
            $cond: {
              if: {
                $in: [
                  new mongoose.Types.ObjectId(req?.user),
                  "$follower.follower",
                ],
              },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $project: {
          password: 0,
          email: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
    ]);
    const user = allUsers.filter((user) => user._id != req.user);
    res.send({ success: true, user });
  } catch (error) {
    throw error;
  }
};

const following = async (req, res) => {
  try {
    const { followingId } = req.params;
    const user = await User.findById(req.user);
    if (user) {
      await Follower.create({
        follower: req.user,
        following: followingId,
      });
    }
    res
      .status(200)
      .json({ success: true, message: "User followed successfully." });
  } catch (error) {
    throw error;
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.aggregate([
      {
        $match: {
          username: username?.toLowerCase(),
        },
      },
      {
        $lookup: {
          from: "followers",
          localField: "_id",
          foreignField: "following",
          as: "follower",
        },
      },
      {
        $lookup: {
          from: "followers",
          localField: "_id",
          foreignField: "follower",
          as: "following",
        },
      },
      {
        $addFields: {
          followerCount: {
            $size: "$follower",
          },
          followingCount: {
            $size: "$following",
          },
          isfollowed: {
            $cond: {
              if: {
                $in: [
                  new mongoose.Types.ObjectId(req?.user),
                  "$follower.follower",
                ],
              },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $project: {
          password: 0,
          email: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
    ]);
    const post = await Post.find({ user: user[0]?._id });
    const posts = post.filter((post) => post.path != null);
    res.status(200).json({ apiResponse: user, posts });
  } catch (error) {
    throw error;
  }
};

const unfollow = async (req, res) => {
  try {
    const { followingId } = req.params;
    const userToUnfollow = await User.findOne({ _id: followingId });

    if (!userToUnfollow) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const result = await Follower.deleteOne({
      follower: req.user,
      following: userToUnfollow._id,
    });

    res
      .status(200)
      .json({ success: true, message: "User unfollowed successfully." });
  } catch (error) {
    throw error;
  }
};


const getFollowers = async (req, res) => {
  try {
    const currentUserFollowing = await Follower.find({
      follower: req.user,
    }).distinct("following");

    const followers = await Follower.find({
      following: req.user,
      follower: { $nin: currentUserFollowing },
    }).populate("follower");

    res.status(200).json({ success: true, followers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getFollowing = async (req, res) => {
  try {
    const following = await Follower.find({ follower: req.user }).populate(
      "following"
    );
    res.status(200).json({ success: true, following });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const editProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user,
      {
        name,
        bio,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updatedAvatar = async (req, res) => {
  try {
    let image = req?.file?.path;
    let avatarImage = "";
    if (image != undefined) {
      avatarImage = await uploadoncloudinary(image);
    }
    const user = await User.findByIdAndUpdate(
      req.user,
      {
        profilePicture: avatarImage?.url ?? null,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateCoverImage = async (req, res) => {
  try {
    let image = req?.file?.path;
    console.log(image);
    let coverImage = "";
    if (image != undefined) {
      coverImage = await uploadoncloudinary(image);
    }
    const user = await User.findByIdAndUpdate(
      req.user,
      {
        coverImage: coverImage?.url ?? null,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  signup,
  login,
  logout,
  getUser,
  getAllUsers,
  following,
  getUserProfile,
  unfollow,
  getFollowers,
  getFollowing,
  editProfile,
  updatedAvatar,
  updateCoverImage,
};
