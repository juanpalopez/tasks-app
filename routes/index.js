var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {
    title: "This is my first app",
    description: "It is going to be a great app"
  });
});

module.exports = router;
