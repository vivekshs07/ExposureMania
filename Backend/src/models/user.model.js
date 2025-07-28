const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true,lowercase:true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profilePicture: {
    type: String,
    default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
  },
  coverImage:String,
  bio: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref:"post" }],
});

userSchema.methods.generateAuthToken =async function () {
  const token = jwt.sign(
    {
      _id: this._id.toString(),
      username: this.username,
      email: this.email,
      name: this.name,
    },
    process.env.JWT,
    {
      expiresIn: "2h",
    }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
