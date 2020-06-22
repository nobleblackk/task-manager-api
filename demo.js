// const add = (a, b) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(a + b);
//       //   reject("Error Msg");
//     }, 2000);
//   });
// };

// // AsyncAwait => appending async in front of any function makes sure that now this function will return a promise, and when we use await operator , it treats asynchronous function like synchronous function, but treat them asynchronously and it returns only resolve, if promise gives reject(), then it will not move forward to the code and directly print error, if we have the provision of .catch() function
// const doWork = async () => {
//   console.log("ABhi");
//   const sum = await add(1, 99);
//   console.log("ABhishek"); // ABhishek will only be printed after the line no 13 is executed perfectly, if that gives error, then it will not move forward to this line and return error
//   const sum1 = await add(sum, 100);
//   return sum1;
// };

// doWork()
//   .then((res) => console.log(res))
//   .catch((error) => console.log(error));

// // Promises Chaining
// // add(1, 2)
// //   .then((result) => {
// //     console.log(result);
// //     return add(result, 3);
// //   })
// //   .then((result) => {
// //     console.log(result);
// //   })
// //   .catch((error) => console.log(error));

// const deleteTaskAndCount = async (id) => {
//   const task = await Task.findByIdAndDelete(id);
//   const count = await Task.countDocuments({ completed: false });
//   return count;
// };

// deleteTaskAndCount("5ee94e31f461f43d6f9134c8")
//   .then((count) => console.log(count))
//   .catch((error) => console.log(error));

// const bcrypt = require("bcryptjs");
// const password = "Abhishek";
// const hashing = async () => {
//   const hashedPassword = await bcrypt.hash(password, 8);
//   console.log(hashedPassword);
//   console.log(await bcrypt.compare(password, hashedPassword));
// };

// hashing();

const jwt = require("jsonwebtoken");
const myFunction = async () => {
  const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse", {
    expiresIn: "7 days",
  });
  console.log(token);
  const data = jwt.verify(token, "thisismynewcourse");
  console.log(data);
};

myFunction();
