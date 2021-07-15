import mongoose from 'mongoose';
import db from '../libs/database.js'

const { Schema } = mongoose;

const ItemsSchema = new Schema({
    name: String,
    description: String,
    province : String,
    address : String,
    phoneNumber : String,
    email : String,
    images: [Schema.Types.Mixed],
    reports : [Schema.Types.Mixed]
},{timestamps : true});

export default db.models.Items || db.model('Items', ItemsSchema);