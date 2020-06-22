const express = require("express");
const Task = require("../models/tasks");
const auth = require("../middleware/auth");

const router = new express.Router();

// Resource Creation for HTTP POST method for Task
router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  console.log(task);
  // AsyncAwait
  try {
    await task.save();
    console.log("yo");
    res.status(201).send(task);
  } catch (error) {
    console.log("error");
    res.status(400).send(error);
  }

  // task
  //   .save()
  //   .then((task) => res.status(201).send(task))
  //   .catch((error) => {
  //     res.status(400).send(error);
  //   });
});

// Resource Creation for HTTP GET method for tasks
// GET /tasks?isCompleted=true
// GET /tasks?limit=10&skip=20
// GET /tasks/?sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  try {
    // const tasks = await Task.find({ owner: req.user._id });
    console.log(req.user);
    const match = {};
    if (req.query.isCompleted) {
      match.isCompleted = req.query.isCompleted === "true";
    }
    const sort = {};
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }

    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send();
  }
  // Task.find({})
  //   .then((tasks) => {
  //     res.send(tasks);
  //   })
  //   .catch((error) => {
  //     res.status(500).send();
  //   });
});

// Fetching Single Entry
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
  // Task.findById(_id)
  //   .then((task) => {
  //     if (!task) {
  //       res.status(404).send();
  //     }
  //     res.send(task);
  //   })
  //   .catch((error) => {
  //     res.status(500).send();
  //   });
});

// Updatation for tasks
router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "isCompleted"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates" });
  }
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    // const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).send();
    }

    console.log(task);

    updates.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();

    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
