var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

/* GET cool users */
router.get("/cool", function(req, res, next) {
  res.send("Only cool users will be shown here");
});

module.exports = router;
