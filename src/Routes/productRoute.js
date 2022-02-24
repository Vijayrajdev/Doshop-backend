import { Router } from "express";
import Product from "../Services/mongodb/models/Product";
import Category from "../Services/mongodb/models/Category";
import { body, validationResult } from "express-validator";

// Router
const router = Router();

// ROUTES

/*
Route           - /api/v1/product/all
Description     - Get all the products
Access          - PUBLIC
Parameter       - NONE
Method          - GET
*/

router.get("/all", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send({ products });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ categories: [] });
  }
});

/*
Route           - /api/v1/product/addProduct
Description     - To add a new product
Access          - PRIVATE
Parameter       - NONE
Method          - POST
*/

router.post(
  "/addProduct",
  body("name").isLength({ min: 3 }),
  body("price").isNumeric(),
  body("listPrice").isNumeric(),
  body("description").isLength({ min: 10 }),
  body("color").isLength({ min: 3 }),
  body("category").isLength({ min: 5 }),
  body("imageUrl").isURL(),
  body("stock").isNumeric(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(403)
        .send({ Errors: errors.array(), Message: "Bad request" });
    }
    try {
      // Check if category exists
      const category = await Category.findById(req.body.category);
      if (!category) {
        res.status(300).json({ products: null, message: "Invalid category!" });
      }
      const product = await new Product(req.body);
      await product.save();
      res.send({ product, message: "Product added sucessfully!" });
    } catch (error) {
      res
        .status(500)
        .json({ products: null, message: "Unable to add product!!" });
    }
  }
);

/*
Route           - /api/v1/product/update/:id
Description     - To update a product
Access          - PRIVATE
Parameter       - ID
Method          - PUT
*/

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Check if category exists
    const category = await Category.findById(req.body.category);
    if (!category) {
      res.status(300).json({ products: null, message: "Invalid category!" });
    }
    const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.send({ product, message: "Sucessfully updated!!" });
  } catch (error) {
    console.log(error.message);
    res.json({
      Products: null,
      Message: `Unable to update product`,
    });
  }
});

/*
Route           - /api/v1/product/delete/:id
Description     - To delete a product
Access          - PRIVATE
Parameter       - ID
Method          - DELETE
*/

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndRemove(id);
    res.send({ Message: "Sucessfully deleted!!!", Product });
  } catch (error) {
    console.log(error.message);
    res.json({
      products: null,
      Message: `Unable to delete category`,
    });
  }
});

export default router;
