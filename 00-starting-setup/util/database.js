const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://ramsankaraloor:${process.env.MONGODB_PASSWORD}@cluster0.xggjwq1.mongodb.net/shop?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log("MongoDB connected !!");
      _db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found !";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
