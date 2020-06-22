const express = require("express");
const User = require("../models/user");
const sharp = require("sharp");
const auth = require("../middleware/auth");
const { sendCancelationEmail, sendWelcomeEmail } = require("../emails/account");

// File Uploading Multer Module
const multer = require("multer");

// const bodyParser = require("body-parser");

const router = new express.Router();

// router.use(bodyParser.json());
router.use(express.json());
// router.use(bodyParser.urlencoded({ extended: true }));

// Through this we can create routes and then finally export router to our main file "index.js"

// Resource Creation for HTTP POST Method
router.post("/users", async (req, res) => {
  console.log("req.body", req.body);
  // res.send("Testing!");
  // Creating new user
  console.log("creating user");
  const user = new User(req.body);
  console.log("user", user);

  //  Saving the user document
  // user
  //   .save()
  //   .then((user) => res.status(201).send(user))
  //   .catch((error) => {
  //     // TO set the status on Response
  //     //   res.status(400);
  //     //   res.send(error);
  //     // Shorthand =>
  //     res.status(400).send(error);
  //   });
  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Resource Creation for Signing out Single Session of User
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

// Resource Creation for Signing out All Sessions of User
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send(200);
  } catch (error) {
    res.status(500).send();
  }
});

// Resource Creation for HTTP GET method for users
router.get("/users/me", auth, async (req, res) => {
  console.log(req.body);
  res.send(req.user);
  // try {
  //   const users = await User.find({});
  //   res.send(users);
  // } catch (error) {
  //   res.status(500).send();
  // }

  // User.find({})
  //   .then((users) => {
  //     res.send(users);
  //   })
  //   .catch((error) => {
  //     res.status(500).send();
  //   });
});

// Fetching Single Entry
// router.get("/users/:id", async (req, res) => {
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

// Updatation for users
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  console.log(updates);
  const allowedUpdate = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdate.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!" });
  }
  try {
    // const user = await User.findById(req.params.id);
    // console.log(user);
    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    // if (!user) {
    //   return res.status(404).send();
    // }
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Deletion
router.delete("/users/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id);

    // if (!user) {
    //   return res.status(404).send();
    // }

    await req.user.remove();
    sendCancelationEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

const upload = multer({
  // dest: "avatars",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error("Please Upload Image with Proper Extension"));
    }
    cb(undefined, true);
  },
});

// File Upload Router
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    // old methodology
    // req.user.avatar = req.file.buffer;

    // Editing the profile picture
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    // console.log(req.user.avatar);
    await req.user.save();
    res.send("Image Uploaded!");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// Deleting User Profile Picture
router.delete("/users/me/avatar", auth, async (req, res) => {
  // console.log(req.user.avatar);
  req.user.avatar = undefined;
  await req.user.save();
  res.send("Profile Deleted Successfully!");
});

// Serving/Getting User Profile Picture
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    // Setting headers for the image response, by default it is like application/json
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (error) {}
});

module.exports = router;
