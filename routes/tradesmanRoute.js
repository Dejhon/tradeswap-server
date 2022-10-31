const express = require("express");
const router = express.Router();
const tradesmanController = require("./../controllers/tradesmanController");

router
   .route("/")
   .get(tradesmanController.getAllTradesman)
   .post(tradesmanController.createTradesman);

router
   .route("/:id")
   .get(tradesmanController.getTradesmanById)
   .patch(tradesmanController.updateTradesman)
   .delete(tradesmanController.deleteTradesman);

router
   .route("/category-search/:id")
   .get(tradesmanController.findTradesmanByCategory);

router
   .route("/parish-search/:id")
   .get(tradesmanController.findTradesmanByParish);

module.exports = router;
