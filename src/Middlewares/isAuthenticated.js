import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    if (_id) next();
    res.json({
      message: "unauthorized!!",
    });
  } else {
    res.json({
      message: "unauthorized!!",
    });
  }
};

export default isAuthenticated;
