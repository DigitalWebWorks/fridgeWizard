const express = require("express");
const router = express.Router();

// require in inventoryController
const inventoryController = require("../controllers/inventoryController");

// get types for dropdown menu
router.get("/types", inventoryController.getTypes, (req, res) => {
  res.status(200).json(res.locals.shelfLifeData);
});

// get fridge items for a user
router.get("/:email", inventoryController.getItem, (req, res) => {
  res.status(200).json(res.locals.fridgeContents);
});

// add new fridge item for a user
router.post("/", inventoryController.setItem, (req, res) => {
  res.status(200).json(res.locals.fridgeContents);
});

// delete fridge items for a user
router.delete("/", inventoryController.deleteItem, (req, res) => {
  res.status(200).json(res.locals.fridgeContents);
});

module.exports = router;
