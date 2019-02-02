const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completionDate: Date
});

module.exports = mongoose.model("Task", TaskSchema);
