import jwt from "jsonwebtoken";

const isAdmin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[0];

  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { role } = decodedToken;
    if (role == 1) next();
    else {
      res.json({
        message: "access denied!",
      });
    }
  } else {
    res.json({
      message: "unauthorized!!",
    });
  }
};

export default isAdmin;
