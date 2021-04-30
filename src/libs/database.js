import mongoose from 'mongoose'
const connectionString = process.env.MONGODB_URI;
console.log(connectionString)
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

export default db;