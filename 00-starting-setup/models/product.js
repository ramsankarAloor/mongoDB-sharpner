const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  title: {
    type: String,
    required:true 
  },
  price: {
    type: Number,
    required: true 
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true 
  }
})
// this  product schema is a blueprint, we need to export a model of name 'Product' from this.

module.exports = mongoose.model('Product', productSchema);

// mongoose takes the name Product, and make it products and make a collection with name products.

// const mongodb = require("mongodb");
// const { getDb } = require("../util/database");

// class Product {
//   constructor(title, price, description, imageUrl, id) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id;
//   }

//   async save() {
//     const db = getDb();
//     if (this._id) {
//       try {
//         const updatedProduct = await db.collection('products').updateOne({_id : new mongodb.ObjectId(this._id)}, {$set : this});
//         return updatedProduct;
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       try {
//         const insertedProduct = await db.collection("products").insertOne(this);
//         return insertedProduct;
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   }

//   static async fetchAll() {
//     const db = getDb();
//     try {
//       const cursor = db.collection("products").find();
//       const products = await cursor.toArray();
//       return products;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   static async findById(productId) {
//     const db = getDb();
//     try {
//       const cursor = db
//         .collection("products")
//         .find({ _id: new mongodb.ObjectId(productId) });
//       const product = await cursor.next();
//       return product;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   static async deleteById(prodId) {
//     const db = getDb();
//     try {
//       await db.collection('products').deleteOne({ _id : new mongodb.ObjectId(prodId)});
//       console.log('deleted product');
//     }catch(error) {
//       console.log(error);
//     }
//   }
// }

// module.exports = Product;
