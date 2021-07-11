import mongoose from 'mongoose'

const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).catch(err => console.log(err));

const db = mongoose.connection;

export default db;