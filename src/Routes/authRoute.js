import { Router } from "express";
import User from "../Services/mongodb/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isAdmin from "../Middlewares/isAdmin";
import { body, validationResult } from "express-validator";

// Router
const router = Router();

// ROUTES

/*
Route           - /api/v1/auth/users
Description     - Get all the users
Access          - PRIVATE
Parameter       - NONE
Method          - GET
*/

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ users });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ users: [] });
  }
});

/*
Route           - /api/v1/auth/signup
Description     - To add a new user
Access          - PUBLIC
Parameter       - NONE
Method          - POST
*/

router.post(
  "/signup",
  body("firstName").isLength({ min: 5 }),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res
        .status(403)
        .send({ Error: error.array(), Message: "Bad request" });
    }
    try {
      const { firstName, lastName, email, password } = req.body;

      // Bcrypt password hashing
      const salt = await bcrypt.genSalt(5);
      const hash = await bcrypt.hash(password, salt);

      // Storing hashed password
      const user = await new User({
        firstName,
        lastName,
        email,
        password: hash,
      });
      await user.save();
      res.send({ user });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ users: [] });
    }
  }
);

/*
Route           - /api/v1/auth/login
Description     - To login
Access          - PUBLIC
Parameter       - NONE
Method          - POST
*/

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      // Comparing hashed password
      const authorize = await bcrypt.compare(password, user.password);
      if (authorize) {
        const { _id, role } = user;

        // Generating JWT token
        const token = jwt.sign({ _id, role }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.json({ token });
      }
      return res.json({ token: null, message: "unauthorized user!" });
    } else {
      return res.json({ token: null, message: "user not found!!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ token: null });
  }
});

export default router;
