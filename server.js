//env settings
require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require('cors')


// environmental variables
const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

//frontend domain name in env
const FRONTEND = process.env.FRONTEND;

//cros applied to specific domain or Ip
var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
// cros poliy
app.use(cors(corsOptions))
// app to understand json formta we put
app.use(express.json());

// if you want to send data in X-www-form-urlencoded(key: value) rather then json req.body we use this middleware
app.use(express.urlencoded({extended:false}));

//routes

// middleware to use product
app.use("/api/products",productRoute);


app.get("/", (req, res) => {
    res.send("hello NODE API");
});
app.get("/blog", (req, res) => {
  res.send("hello Block, My name is Nisarga");
});

//custom middleware
app.use(errorMiddleware);

//mongodb connection
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("connected to mongodb");
    app.listen(PORT, () => {
        console.log(`Node API app is running on port ${PORT}`);
      });
    
  })
  .catch((err) => {
    console.log(err);
  });
