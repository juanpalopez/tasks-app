const express = require("express");
const router = express.Router();
const task = require("../controllers/TaskController");

// Get all tasks
router.get("/", function(req, res, next) {
  task.list(req, res);
  //   res.send("respond with a resource");
});

// Get single task by id
router.get("/show/:id", (req, res) => {
  task.show(req, res);
});

// Create task
router.get("/create", (req, res) => {
  task.create(req, res);
});

// Save task
router.post("/save", (req, res) => {
  task.save(req, res);
});

// Edit task
router.get("/edit/:id", (req, res) => {
  task.edit(req, res);
});

// Update task
router.post("/update/:id", (req, res) => {
  task.update(req, res);
});

// Delete task
router.post("/delete/:id", (req, res) => {
  task.delete(req, res);
});

module.exports = router;
