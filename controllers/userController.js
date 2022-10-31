const User = require("../models/userModel");
const { JSONResponse } = require("../utilities/jsonResponse");

class UserController {
   static createUser = async (req, res, next) => {
      try {
         let data = req.body;
         if (Object.keys(data).length == 0)
            throw new Error("No data was passed to create user");
         let user = await new User(data).save();
         user.password = undefined;
         JSONResponse.success(
            res,
            "User profile successfully created",
            user,
            201
         );
      } catch (error) {
         JSONResponse.error(res, "Error creating user profile", error, 400);
      }
   };
   static getAllUsers = async (req, res, next) => {
      try {
         let users = await User.find();
         JSONResponse.success(
            res,
            "Retrieved all users successfully",
            users,
            201
         );
      } catch (error) {
         JSONResponse.error(res, "Error retrieving users", error, 404);
      }
   };
   static updateUser = async (req, res, next) => {
      try {
         let data = req.body;
         let id = req.params.id;
         if (!ObjectId.isValid(id))
            throw new Error("Invalid ID was passed as a parameter");
         if (Object.keys(data).length == 0) {
            return JSONResponse.success(
               res,
               "No data passed, file not updated",
               {},
               200
            );
         }
         let user = await User.findOneAndUpdate({ _id: id }, data, {
            new: true,
         });
         if (!user) throw new Error("User not found with the ID");
         JSONResponse.success(res, "User updated successfully", user, 200);
      } catch (error) {
         JSONResponse.error(res, "Unable to update user", error, 404);
      }
   };
   static deleteUser = async (req, res, next) => {
      try {
         let id = req.params.id;
         if (!ObjectId.isValid(id))
            throw new Error("ID does not match any user in database");
         let user = await User.findByIdAndDelete(id);
         if (!user) throw new Error("User does not exist with this ID");
         JSONResponse.success(res, "Successfully deleted user", user, 203);
      } catch (error) {
         JSONResponse.error(res, "Unable to delete user", error, 404);
      }
   };
   static getUserById = async (req, res, next) => {
      try {
         let id = req.params.id;
         if (!ObjectId.isValid(id))
            throw new Error("Id is not a valid user profile in database");
         let user = await User.findById(id);
         if (!user) throw new Error("User not found with this id");
         user.password = undefined;
         JSONResponse.success(res, "Retrieved user info", user, 200);
      } catch (error) {
         JSONResponse.error(res, "Unable to find user", error, 404);
      }
   };
}

module.exports = UserController;
