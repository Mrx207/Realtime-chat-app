const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const URI = process.env.MONGODB_URI;
const mongoose = require("mongoose");

// Connection URI

// Connect to MongoDB
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(URI);
  console.log("CONNECTED");
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// async function mongoGetMessages(room) {
//   const uri = process.env.MONGODB_URI;
//   const dbName = process.env.MONGODB_DB;
//   if (!uri || !dbName) return null;

//   const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   try {
//     await client.connect();

//     const database = client.db(dbName);
//     const collection = database.collection("messages");

//     const messages = await collection.find({ room: room }).limit(100).toArray();
//     return JSON.stringify(messages);
//   } catch (error) {
//     return error;
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);

// module.exports = mongoGetMessages;
