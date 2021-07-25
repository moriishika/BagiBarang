import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db("bagibarang");
  return next();
}

async function connectToDatabase() {
  if (!client.isConnected()) await client.connect();
  const db = client.db('bagibarang');
  return db;
}

const dbmiddleware = nextConnect();

dbmiddleware.use(database);

export {dbmiddleware, connectToDatabase};

// import mongoose from 'mongoose'

// const connectionString = process.env.MONGODB_URI;

// mongoose.connect(connectionString, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
// }).catch(err => console.log(err));

// const db = mongoose.connection;
