import Adapters from "next-auth/adapters";

export default class User extends Adapters.TypeORM.Models.User.model {
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
    this.slug = "";
    this.name = "";
    this.province = "";
    this.address = "";
    this.phoneNumber = "";
    this.email = email;
    this.image = image;
    this.isVerified = false;
  }
}

export const UserSchema = {
  name: "User",
  target: User,
  columns: {
    ...Adapters.TypeORM.Models.User.schema.columns,
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
