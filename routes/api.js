const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/cars", (req, res) => {
  fs.readFile("./data/cars.json", (err, json) => {
    let obj = JSON.parse(json);
    res.json(obj);
  });
});

module.exports = router;
