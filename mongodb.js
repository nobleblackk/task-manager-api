// CRUD create read update delete
// const mongodb = require("mongodb");

// it gonna give us access to necessary function to connect to  database  to perform CRUD operations.
// const MongoClient = mongodb.MongoClient;

// Destructuring of object
// const { MongoClient, ObjectID } = require("mongodb");
// URL of database mongodb.Server(in our case, localhost)
// console.log(MongoClient);
// const id = new ObjectID();
// console.log(id.getTimestamp());
// console.log(id.toHexString());
// const connectionURL = "mongodb://127.0.0.1:27017";

// Database name
// const databaseName = "task-manager";

// Connecting to Server
// MongoClient.connect(
//   connectionURL,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (error, client) => {
//     if (error) {
//       return console.log("Unable to connect to database");
//     }
//     // Creating a database by giving name, now db will be poiting to our database, that we creating
//     const db = client.db(databaseName);
//     // db.collection("users").insertOne(
//     //   {
//     //     name: "Abhishek",
//     //     age: 22,
//     //   },
//     //   (error, result) => {
//     //     if (error) {
//     //       return console.log("Unable to insert user");
//     //     }
//     //     console.log(result.ops);
//     //   }
//     // );
//     db.collection("users").insertMany(
//       [
//         {
//           name: "Abhi",
//           age: 23,
//         },
//         {
//           name: "NobleBlack",
//           age: 22,
//         },
//       ],
//       (error, result) => {
//         if (error) {
//           return console.log("Unable to insert user");
//         }
//         console.log(result.ops);
//       }
//     );
//   }
// );
//The old URLParser is deprecated, so here we are passing an argument to use newUrlParser explicitly

// MongoClient.connect(
//   connectionURL,
//   {
//     useNewParser: true,
//     useUnifiedTopology: true,
//   },
//   (error, client) => {
//     if (error) {
//       return console.log("Unable to connect to database");
//     }
//     const db = client.db(databaseName);
//     db.collection("tasks").insertMany(
//       [
//         {
//           description: "Hey buddy",
//           isCompleted: true,
//         },
//         {
//           description: "Bye buddy",
//           isCompleted: false,
//         },
//       ],
//       (error, result) => {
//         if (error) {
//           return console.log("Unable to connect to database");
//         }
//         console.log(result.ops);
//       }
//     );
//   }
// );

// MongoClient.connect(
//   connectionURL,
//   {
//     useNewParser: true,
//     useUnifiedTopology: true,
//   },
//   (error, client) => {
//     if (error) {
//       return console.log("Unable to connect to database");
//     }
//     const db = client.db(databaseName);
//     // db.collection("users").insertMany(
//     //   {
//     //     name: "NobleBlafdfgdhck",
//     //     age: 22,
//     //   },
//     //   {
//     //     name: "BlankHead",
//     //     age: 22,
//     //   },
//     //   {
//     //     name: "Abhishek Sharma",
//     //     age: 22,
//     //   },
//     //   (error, result) => {
//     //     if (error) {
//     //       return console.log("Unable to fetch the data");
//     //     }
//     //     console.log(result.ops);
//     //   }
//     // );
//     // db.collection("users")
//     //   .find({ age: 22 })
//     //   .toArray((error, users) => {
//     //     console.log(users);
//     //   });

//     // db.collection("tasks").findOne(
//     //   { _id: new ObjectID("5ee753be856ad75ad1f4eb7e") },
//     //   (error, result) => {
//     //     if (error) {
//     //       return console.log(error);
//     //     }
//     //     console.log(result);
//     //   }
//     // );

//     db.collection("tasks")
//       .find({ isCompleted: false })
//       .toArray((error, users) => {
//         console.log(users);
//       });
//   }
// );
// Destructuring the object
const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";

const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error, client) => {
    if (error) {
      return console.log(error);
    }
    const db = client.db(databaseName);
    // db.collection("demo").insertMany(
    //   [
    //     {
    //       name: "Abhishek",
    //       age: 22,
    //     },
    //     {
    //       name: "Abhinav",
    //       age: 22,
    //     },
    //     {
    //       name: "NobleBlack",
    //       age: 23,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log(error);
    //     }
    //     console.log(result.ops);
    //   }
    // );
    db.collection("demo")
      .find({})
      .toArray((error, documents) => {
        if (error) {
          return console.log(error);
        }
        console.log(documents);
      });
    // By Callback way
    // db.collection("demo").updateOne(
    //   {
    //     _id: new ObjectID("5ee9236d9d72dc5895b1c537"),
    //   },
    //   {
    //     $set: {
    //       name: "Abhishek Sharma",
    //     },
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log(error);
    //     }
    //     console.log(result);
    //   }
    // );
    // By Promise way
    // db.collection("demo")
    //   .updateMany(
    //     {
    //       age: 22,
    //     },
    //     {
    //       $set: {
    //         name: "Abhi",
    //       },
    //       $inc: {
    //         age: 2,
    //       },
    //     }
    //   )
    //   .then((result) => console.log("Success!", result))
    //   .catch((error) => console.log("Error!", error));
    // deleting the document
    db.collection("demo")
      .deleteMany({
        name: "Abhi",
      })
      .then((result) => console.log("Success"))
      .catch((error) => console.log(error));
  }
);
