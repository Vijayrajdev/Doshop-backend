import { Router } from "express";
import Category from "../Services/mongodb/models/Category";
import { body, validationResult } from "express-validator";

// Router
const router = Router();

// Routes

/*
Route           - /api/v1/category/all
Description     - Get all the category
Access          - PUBLIC
Parameter       - NONE
Method          - GET
*/

router.get("/all", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send({ categories });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ categories: [] });
  }
});

/*
Route           - /api/v1/category/addCategory
Description     - To add a new category
Access          - PRIVATE
Parameter       - NONE
Method          - POST
*/

router.post(
  "/addCategory",
  body("name").isLength({ min: 3 }),
  body("description").isLength({ min: 10 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(403)
        .send({ Errors: errors.array(), Message: "Bad request" });
    }
    try {
      const { name, description } = req.body;
      const category = await new Category({ name, description });
      await category.save();
      res.send({ category });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ categories: [] });
    }
  }
);

/*
Route           - /api/v1/category/update/:id
Description     - To update a category
Access          - PRIVATE
Parameter       - ID
Method          - PUT
*/

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.send({ category, message: "Sucessfully updated!!" });
  } catch (error) {
    console.log(error.message);
    res.json({
      categories: null,
      Message: `Unabele to update category${req.body}`,
    });
  }
});

/*
Route           - /api/v1/category/delete/:id
Description     - To delete a category
Access          - PRIVATE
Parameter       - ID
Method          - DELETE
*/

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndRemove(id);
    res.send({ Message: "Sucessfully deleted!!!", Category });
  } catch (error) {
    console.log(error.message);
    res.json({
      categories: null,
      Message: `Unable to delete category`,
    });
  }
});

export default router;
