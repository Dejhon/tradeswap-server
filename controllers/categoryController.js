const Category = require("../models/categoryModel");
const { JSONResponse } = require("../utilities/jsonResponse");
const { ObjectId } = require("mongoose").Types;

class CategoryController {
   static createCategory = async (req, res, next) => {
      try {
         let data = req.body;
         if (Object.keys(data).length == 0)
            throw new Error("Category was not created");
         let category = await new Category(data).save();
         JSONResponse.success(
            res,
            "Category has been created successfully",
            category,
            201
         );
      } catch (error) {
         JSONResponse.error(res, "Error creating category", error, 400);
      }
   };

   static getAllCategory = async (req, res, next) => {
      try {
         let category = await Category.find();
         JSONResponse.success(
            res,
            "Retrived all categories successfully",
            category,
            200
         );
      } catch (error) {
         JSONResponse.error(
            res,
            "Error while retrieving categories",
            error,
            400
         );
      }
   };

   static updateCategory = async (req, res, next) => {
      try {
         let data = req.body;
         let id = req.params.id;
         if (!ObjectId.isValid(id)) throw new Error("Invalid category");
         if (Object.keys(data).length == 0) {
            return JSONResponse.success(
               res,
               "No data has been passed, file not updated",
               {},
               200
            );
         }
         let category = await Category.findByIdAndUpdate({ _id: id }, data, {
            new: true,
         });
         if (!category) throw new Error("Category not found with that id");
         JSONResponse.success(res, "Category updated successfully", 200);
      } catch (error) {
         JSONResponse.error(res, "Unable to update category", 404);
      }
   };

   static deleteCategory = async (req, res, next) => {
      try {
         let id = req.params.id;
         if (Category.length >= 1)
            throw new Error("Cannot delete a category that contains data");
         if (!ObjectId.isValid(id)) throw new Error("Id Doesnt Match");
         let category = await Category.findByIdAndRemove(id);
         if (!category) throw new Error("Category doesnt exist");
         JSONResponse.success(
            res,
            "Category has been deleted successfully",
            category,
            200
         );
      } catch (error) {
         JSONResponse.error(res, "Unable to delete Category", error, 404);
      }
   };

   static getCategoryById = async (req, res, next) => {
      try {
         let id = req.params.id;
         if (!ObjectId.isValid(id)) throw new Error("CategoryID isnt valid");
         let category = await Category.findById(id);
         if (!category) throw new Error("Category not found");
         JSONResponse.success(res, "Retrieved user info", category, 200);
      } catch (error) {
         JSONResponse.error(res, "Unable to find user", error, 404);
      }
   };
}

module.exports = CategoryController;
