const mongoose = require("mongoose");
const Task = require("../models/Task");

const taskController = {};

// Show list of tasks
taskController.list = function(req, res) {
  Task.find({}).exec(function(err, tasks) {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      //   console.log(tasks);
      console.log("test");
      res.render("../views/tasks/index", { tasks: tasks });
    }
  });
};

// Show task by id
taskController.show = function(req, res) {
  Task.findOne({ _id: req.params.id }).exec(function(err, task) {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      res.render("../views/tasks/show", { task: task });
    }
  });
};

// Create new task
taskController.create = function(req, res) {
  res.render("../views/tasks/create");
};

// Save new task
taskController.save = function(req, res) {
  const task = new Task(req.body);
  console.log(req.body);
  task.save(function(err) {
    if (err) {
      console.log(`Error: ${err}`);
      res.render("../views/tasks/create");
    } else {
      console.log("Successfully created a task");
      res.redirect(`/tasks/show/${task._id}`);
    }
  });
};

// Edit a task
taskController.edit = (req, res) => {
  Task.findOne({ _id: req.params.id }).exec(function(err, task) {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      res.render("../views/tasks/edit", { task: task });
    }
  });
};

// Update a task
taskController.update = function(req, res) {
  Task.findByIdAndUpdate(
    req.params.id,
    // {
    //   $set: {
    //     _id: req.body._id,
    //     title: req.body.title,
    //     description: req.body.description,
    //     completionDate: req.body.completionDate
    //   }
    // },
    req.body,
    { new: true, upsert: false },
    function(err, task) {
      if (err) {
        console.log(err);
        res.render("../views/tasks/edit", { task: req.body });
      }
      res.redirect(`/tasks/show/${task._id}`);
    }
  );
};

// Delete a task
taskController.delete = (req, res) => {
  Task.remove({ _id: req.params.id }, function(err) {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      console.log("Task deleted!");
      res.redirect("/tasks");
    }
  });
};

module.exports = taskController;
