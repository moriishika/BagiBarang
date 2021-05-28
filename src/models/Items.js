import mongoose from 'mongoose';
import db from '../libs/database.js'

const { Schema } = mongoose;

const ItemsSchema = new Schema({
    name: String,
    amount: Number,
    contact: {
        email: String,
        whatsapp: String,
        telp : String
    },
    description: String,
    images: [Schema.Types.Mixed]
});

export default db.models.Items || db.model('Items', ItemsSchema);