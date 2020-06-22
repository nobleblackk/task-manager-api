const express = require("express");

// we actually don't want to grab something from this file, we just want to run this file to set up the database connection, so just doing this and not setting this to any variable
require("./db/mongoose");

const bodyParser = require("body-parser");

// Loading User Model
const User = require("./models/user");
// Loading Tasks Model
const Task = require("./models/tasks");

// Create an express application
const app = express();
const port = process.env.PORT;
console.log("port", port);

// Importing routers from external files
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

// Enabling Express Middlewares in order to execute function before any router handler
// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.status(503).send("Sorry Bud");
//   } else {
//     next();
//   }
// });

// Demo Work
// const multer = require("multer");

// const upload = multer({
//   dest: "images",
//   limits: {
//     fileSize: 1000000,
//   },
// cb is a callback, the first value we pass through cb is error and another value is whether we want to upload the file or not, true means => yes, false means => no
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error("Please upload a Word document"));
//     }
//     cb(undefined, true);
//   },
// });

// For Demo Purpose
// const errorMiddleware = (req, res, next) => {
//   throw new Error("From my middleware");
// };

// app.post(
//   "/upload",
//   upload.single("upload"),
//   (req, res) => {
//     res.send("First File Sent!");
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   }
// );

// Enabling to use external routers
app.use(userRouter);
app.use(taskRouter);

// getting the port value for heroku

// app.get("", (req, res) => {
//   res.send("<h1>Demo Route For Home Page<h1>");
// });

// It gonna autamatically parse the incoming data to an object, so that we can access it in our request handler
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use(bodyParser.json());

// // Resource Creation for HTTP POST Method
// app.post("/users", async (req, res) => {
//   //   console.log(req.body);
//   //   res.send("Testing!");
//   // Creating new user
//   const user = new User(req.body);
//   console.log(user);

//   //  Saving the user document
//   // user
//   //   .save()
//   //   .then((user) => res.status(201).send(user))
//   //   .catch((error) => {
//   //     // TO set the status on Response
//   //     //   res.status(400);
//   //     //   res.send(error);
//   //     // Shorthand =>
//   //     res.status(400).send(error);
//   //   });
//   try {
//     await user.save();
//     res.status(201).send(user);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// // Resource Creation for HTTP POST method for Task
// app.post("/tasks", async (req, res) => {
//   const task = new Task(req.body);
//   console.log(task);
//   // AsyncAwait
//   try {
//     await task.save();
//     console.log("yo");
//     res.status(201).send(task);
//   } catch (error) {
//     console.log("error");
//     res.status(400).send(error);
//   }

//   // task
//   //   .save()
//   //   .then((task) => res.status(201).send(task))
//   //   .catch((error) => {
//   //     res.status(400).send(error);
//   //   });
// });

// Resource Creation for HTTP GET method for users
// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (error) {
//     res.status(500).send();
//   }

//   // User.find({})
//   //   .then((users) => {
//   //     res.send(users);
//   //   })
//   //   .catch((error) => {
//   //     res.status(500).send();
//   //   });
// });

// // Fetching Single Entry
// app.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (error) {
//     res.status(500).send();
//   }
//   // User.findById(_id)
//   //   .then((user) => {
//   //     if (!user) {
//   //       return res.status(404).send();
//   //     }
//   //     res.send(user);
//   //   })
//   //   .catch((error) => res.status(500).send());
// });

// // Resource Creation for HTTP GET method for tasks
// app.get("/tasks", async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.send(tasks);
//   } catch (error) {
//     res.status(500).send();
//   }
//   // Task.find({})
//   //   .then((tasks) => {
//   //     res.send(tasks);
//   //   })
//   //   .catch((error) => {
//   //     res.status(500).send();
//   //   });
// });

// // Fetching Single Entry
// app.get("/tasks/:id", async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const task = await Task.findById(_id);
//     if (!task) {
//       return res.status(404).send();
//     }
//     res.send(task);
//   } catch (error) {
//     res.status(500).send();
//   }
//   // Task.findById(_id)
//   //   .then((task) => {
//   //     if (!task) {
//   //       res.status(404).send();
//   //     }
//   //     res.send(task);
//   //   })
//   //   .catch((error) => {
//   //     res.status(500).send();
//   //   });
// });

// // Updatation for users
// app.patch("/users/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdate = ["name", "email"];
//   const isValidOperation = updates.every((update) => {
//     return allowedUpdate.includes(update);
//   });
//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid Updates!" });
//   }
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// // Updatation for tasks
// app.patch("/tasks/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["description", "isCompleted"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );
//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid Updates" });
//   }
//   try {
//     const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!task) {
//       res.status(404).send();
//     }
//     res.send(task);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Deletion
// app.delete("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.delete("/tasks/:id", async (req, res) => {
//   try {
//     const task = await Task.findByIdAndDelete(req.params.id);
//     if (!task) {
//       return res.status(404).send();
//     }
//     res.send(task);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

// const main = async () => {
//   // const task = await Task.findById("5eef0f169960d42e7d880bae");
//   // await task.populate("owner").execPopulate();
//   // console.log(task.owner);
//   const user = await User.findById("5eef0eec9960d42e7d880bac");
//   // console.log(user);
//   await user.populate("tasks").execPopulate();
//   console.log("User");
//   console.log(user.tasks);
// };

// main();
