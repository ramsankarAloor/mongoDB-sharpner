const mongodb = require("mongodb");
const { getDb } = require("../util/database");

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart; // {items : []}
    this._id = id;
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

  async addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((p) => {
      return p.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const cartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      cartItems[cartProductIndex].quantity = newQuantity;
    } else {
      cartItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = {
      items: cartItems,
    };
    const db = getDb();

    return await db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  async getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((i) => {
      return i.productId;
    });

    const cursor = db.collection("products").find({ _id: { $in: productIds } });
    const cartProducts = await cursor.toArray();

    return cartProducts.map((p) => {
      return {
        ...p,
        quantity: this.cart.items.find((i) => {
          return i.productId.toString() === p._id.toString();
        }).quantity,
      };
    });
  }

  deleteItemFromCart(productId) {
    const cartListAfterDelete = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    });

    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: { items: cartListAfterDelete } } }
      );
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
