const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  const user = await User.findById("65793c03df092085eab1bf6e");
  req.user = user;
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    `mongodb+srv://ramsankaraloor:${process.env.MONGODB_PASSWORD}@cluster0.xggjwq1.mongodb.net/shop?retryWrites=true&w=majority`
  )
  .then((res) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          username: "Ramu",
          email: "ramu@yahoo.com",
          cart: {
            items: [],
          },
        });

        user.save();
      }
    });
    
    app.listen(3000);
  })
  .catch((err) => console.log(err));
