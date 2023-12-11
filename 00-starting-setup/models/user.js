const mongodb = require("mongodb");
const { getDb } = require("../util/database");

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  async save() {
    const db = getDb();
    try {
      const newUser = await db.collection("users").insertOne(this);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  static async findById(userId) {
    const db = getDb();
    try {
      const user = await db
        .collection("users")
        .findOne({ _id: new mongodb.ObjectId(userId) });
      console.log("user found => ", user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
