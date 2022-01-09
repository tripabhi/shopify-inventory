var express = require("express");
var router = express.Router();

var itemService = require("../service/itemService");

router.get("/", function (req, res, next) {
  itemService.getAllItems((err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

router.get("/:id", (req, res, next) => {
  itemService.getItemById(req.params.id, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

router.post("/", (req, res, next) => {
  itemService.createItem(req.body, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: result.data,
      id: result.id,
    });
  });
});

router.patch("/:id", (req, res, next) => {
  itemService.updateItemById(req.body, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: result.data,
      changes: result.changes,
    });
  });
});

router.delete("/:id", (req, res, next) => {
  itemService.deleteItemById(req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }
    res.json({ message: "deleted", changes: result.changes });
  });
});

module.exports = router;
