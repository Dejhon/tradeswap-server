const express = require("express");
const router = express.Router();
const ParishController = require("../controllers/parishController");
const Middleware = require("../middlewares/middleware");

router
   .route("/")
   //    use this to protect routes. im not sure which routes need to be protected
   //    .get(Middleware.isAuthenticated, CategoryController.getAllCategory)
   .get(ParishController.getAllParish)
   .post(ParishController.createParish);

router
   .route("/:id")
   .get(ParishController.getParishById)
   .patch(ParishController.updateParish)
   .delete(ParishController.deleteParish);

module.exports = router;
