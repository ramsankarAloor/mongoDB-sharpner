const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
// const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use(async (req, res, next) => {
//   const user = await User.findById("6577ffa24407fc19fdd7c4dd");
//   req.user = new User(user.username, user.email, user.cart, user._id);
//   next();
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    `mongodb+srv://ramsankaraloor:${process.env.MONGODB_PASSWORD}@cluster0.xggjwq1.mongodb.net/shop?retryWrites=true&w=majority`
  )
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
