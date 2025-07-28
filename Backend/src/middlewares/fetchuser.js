var jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT;
const fetchuser = async (req, res, next) => {
  // get the user from  the jwt token and add it to req object

  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ error: "Please authenticate using a valid token." });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data._id;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Please authenticate using a valid token." });
  }
};
module.exports = fetchuser;
