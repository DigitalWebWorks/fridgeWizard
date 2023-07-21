const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventoryController");

// get items
router.get("/:email", inventoryController.getItem, (req, res) => {
  res.status(200).json(res.locals.getItem);
});

// set item in fridge
router.post("/", inventoryController.setItem, (req, res) => {
  res.status(200).json(res.locals.newItem);
});

// are id params needed?
// update item
router.put("/:id", inventoryController.updateItem, (req, res) => {
  res.status(200).json(res.locals.updateItem);
});

// are id params needed?
//delete item
router.delete("/", inventoryController.deleteItem, (req, res) => {
  res.status(200).json({ message: "Item deleted" });
});

module.exports = router;
