const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController");
const Middleware = require("../middlewares/middleware");

router
   .route("/")
   //    use this to protect routes. im not sure which routes need to be protected
   //    .get(Middleware.isAuthenticated, CategoryController.getAllCategory)
   .get(CategoryController.getAllCategory)
   .post(CategoryController.createCategory);

router
   .route("/:id")
   .get(CategoryController.getCategoryById)
   .patch(CategoryController.updateCategory)
   .delete(CategoryController.deleteCategory);

module.exports = router;
