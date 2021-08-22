import Adapters from "next-auth/adapters";

// Extend the built-in models using class inheritance
export default class User extends Adapters.TypeORM.Models.User.model {
  // You can extend the options in a model but you should not remove the base
  // properties or change the order of the built-in options on the constructor
  constructor(
    name,
    email,
    image,
    emailVerified,
    phoneNumber,
    province,
    address,
    isVerified,
    slug
  ) {
    super(name, email, image, emailVerified, phoneNumber, province, address, isVerified, slug);
  }
}

export const UserSchema = {
  name: "User",
  target: User,
  columns: {
    ...Adapters.TypeORM.Models.User.schema.columns,
    // Adds a phoneNumber to the User schema
    phoneNumber: {
      type: "varchar",
      nullable: true,
    },
    province: {
      type: "varchar",
      nullable: true,
    },
    address: {
      type: "varchar",
      nullable: true,
    },
    isVerified: {
      type: "boolean",
      nullable: true,
    },
    slug: {
      type: "varchar",
      nullable: true,
    },
  },
};

// import mongoose from 'mongoose';
// import db from '../libs/database.js'

// const { Schema } = mongoose;

// const UserSchema = new Schema({
//   name: String,
//   email: String,
//   province: String,
//   address: String,
//   phoneNumber: String,
//   email: String,
//   images: [Schema.Types.Mixed],
//   password : String
// }, { timestamps: true });

// export default db.models.User || db.model('User', UserSchema);
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
