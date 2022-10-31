const Auth = require("../models/authModel");
const { JSONResponse } = require("../utilities/jsonResponse");
const { generateJWTToken } = require("../utilities/tokenGenerator");

class AuthController {
   static authenticate = async (req, res, next) => {
      try {
         let { username, password } = req.body;
         let user = await Auth.findOne({ username: username });
         if (!user)
            throw new Error("No user present which matches the username");
         let passCheck = await user.isCorrectPassword(password);
         if (!passCheck) throw new Error("Invalid password");
         let data = user;
         data.password = undefined;
         data.isAdmin = undefined;
         let token = generateJWTToken(
            {
               id: user._id,
               username: user.username,
               isSuperAdmin: user.isAdmin,
            },
            "3600"
         );

         JSONResponse.success(
            res,
            "User is authenticated successfully",
            { user, token },
            200
         );
      } catch (error) {
         JSONResponse.error(res, "User not Authenticated", error, 401);
      }
   };
}

module.exports = AuthController;
