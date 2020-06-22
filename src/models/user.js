const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tasks = require("./tasks");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: false,
    },
    age: {
      type: Number,
      required: false,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be positive");
        }
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is Not Valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password is not upto the mark");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("tasks", {
  ref: "tasks",
  localField: "_id",
  foreignField: "owner",
});

// When we use res.send(), JSON.stringify() is called on what is inside res.send() and whenever JSON.stringify() is called, toJSON is called upon JSON.stringify(), generally it there is no specific coding in toJSON and it simply returns the JSON Object, but here we are making some customization.
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  console.log(email, password);
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user || user == null) {
      console.log("error123");
      return new Error("Unable to login");
    }
    const match = await bcrypt.compare(password, user.password);
    console.log("match", match);
    if (!match) {
      throw new Error("Unable to login");
    }
    return user;
  } catch (error) {
    console.log("error");
    return error;
  }
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  // Here we will have the access of this keyword, which points to the document which is going to saved, so we can perform any operation, we want. this is the reason we are not using arrow functions here bcoz arrow functions doesn't have their own this bindings
  const user = this;
  // console.log("Middleware Checking");

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Delete user tasks when user is removed
userSchema.pre("remove", async function (next) {
  const user = this;
  await tasks.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
