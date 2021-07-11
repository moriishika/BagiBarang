import mongoose from 'mongoose';
import db from '../libs/database.js'

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: String,
  province: String,
  address: String,
  phoneNumber: String,
  email: String,
  images: [Schema.Types.Mixed],
  password : String
}, { timestamps: true });

export default db.models.User || db.model('User', UserSchema);
// import Adapters from "next-auth/adapters"

// export default class User extends Adapters.TypeORM.Models.User.model {
//   constructor(name, email, image, emailVerified, province, address, phoneNumber, password,) {
//     super(name, email, image, emailVerified)
//     this.province = province;
//     this.address = address;
//     this.phoneNumber = phoneNumber;
//     this.password = password;
//   }
// }



// export const UserSchema = {
//   name: "User",
//   target: User,
//   columns: {
//     ...Adapters.TypeORM.Models.User.schema.columns,
//     phoneNumber : {
//       type   : 'varchar',
//       nullable : 'true'
//     },
//     address : {
//       type : 'varchar',
//       nullable : 'true'
//     },
//     province : {
//       type : 'varchar',
//       nullable : 'true'
//     },
//     password : {
//       type : 'varchar', 
//       nullable : 'true'
//     }
//   },
// }


