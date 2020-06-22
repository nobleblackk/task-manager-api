// This file is kept so to only set up the connection with mongodb database
// loading mongoose to model our documents
const mongoose = require("mongoose");
const validator = require("validator");
// Connecting to database
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// Modelling our database-document(defining properties and the values of respective fields)
// const User = mongoose.model("User", {
//   name: {
//     type: String,
//   },
//   age: {
//     type: Number,
//   },
// });

// const me = new User({
//   name: "Abhishek",
//   age: 22,
// });

// me.save()
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));

// const tasks = mongoose.model("tasks", {
//   description: {
//     type: String,
//   },
//   isCompleted: {
//     type: Boolean,
//   },
// });

// const me = new tasks({
//   description: "This is for demo purpose",
//   isCompleted: true,
// });

// me.save()
//   .then((result) => console.log(result))
//   .catch((error) => console.log(erro));

// const User = mongoose.model("User", {
//   name: {
//     type: String,
//     trim: true,
//     lowercase: true,
//     required: true,
//   },
//   age: {
//     type: Number,
//     validate(value) {
//       if (value < 0) {
//         throw new Error("Age must be positive");
//       }
//     },
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Email is Not Valid");
//       }
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 7,
//     validate(value) {
//       if (value.toLowerCase().includes("password")) {
//         throw new Error("Password is not upto the mark");
//       }
//     },
//   },
// });

// const me = new User({
//   name: "Abhishek",
//   email: "abhisHeksHaRmA0313@gMaIl.cOm",
//   password: "         rffd",
// });

// me.save()
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));

// const tasks = mongoose.model("tasks", {
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   isCompleted: {
//     type: Boolean,
//     default: false,
//   },
// });

// const me = new tasks({
//   description: "  this is for testing   ",
// });

// me.save((error, result) => {
//   console.log(result);
// });
