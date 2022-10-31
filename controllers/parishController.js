const Parish = require("../models/parishModel");
const { JSONResponse } = require("../utilities/jsonResponse");
const { ObjectId } = require("mongoose").Types;

class ParishController {
   static createParish = async (req, res, next) => {
      try {
         let data = req.body;
         if (Object.keys(data).length == 0)
            throw new Error("Parish was not created");
         let parish = await new Parish(data).save();
         JSONResponse.success(
            res,
            "Parish has been created successfully",
            parish,
            201
         );
      } catch (error) {
         JSONResponse.error(res, "Error creating parish", error, 400);
      }
   };

   static getAllParish = async (req, res, next) => {
      try {
         let parishes = await Parish.find();
         JSONResponse.success(
            res,
            "Retrived all parishes successfully",
            parishes,
            200
         );
      } catch (error) {
         JSONResponse.error(
            res,
            "Error while retrieving parishes",
            error,
            400
         );
      }
   };

   static updateParish = async (req, res, next) => {
      try {
         let data = req.body;
         let id = req.params.id;
         if (!ObjectId.isValid(id)) throw new Error("Invalid parish");
         if (Object.keys(data).length == 0) {
            return JSONResponse.success(
               res,
               "No data has been passed, file not updated",
               {},
               200
            );
         }
         let parish = await Parish.findByIdAndUpdate({ _id: id }, data, {
            new: true,
         });
         if (!parish) throw new Error("Parish not found with that id");
         JSONResponse.success(res, "Parish updated successfully", 200);
      } catch (error) {
         JSONResponse.error(res, "Unable to update parish", 404);
      }
   };

   static deleteParish = async (req, res, next) => {
      try {
         let id = req.params.id;
         if (Parish.length >= 1)
            throw new Error("Cannot delete a parish that contains data");
         if (!ObjectId.isValid(id)) throw new Error("Id Doesnt Match");
         let parish = await Parish.findByIdAndDelete(id);
         if (!parish) throw new Error("Parish doesnt exist");
         JSONResponse.success(
            res,
            "Parish has been deleted successfully",
            parish,
            200
         );
      } catch (error) {
         JSONResponse.error(res, "Unable to delete Parish", error, 404);
      }
   };

   static getParishById = async (req, res, next) => {
      try {
         let id = req.params.id;
         if (!ObjectId.isValid(id)) throw new Error("ParishID isnt valid");
         let parish = await Parish.findById(id);
         if (!parish) throw new Error("Parish not found");
         JSONResponse.success(res, "Parish Retrieved", parish, 200);
      } catch (error) {
         JSONResponse.error(res, "Unable to find parish", error, 404);
      }
   };
}

module.exports = ParishController;
