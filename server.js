const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/productModel");


// app to understand json formta we put
app.use(express.json());

// if you want to send data in X-www-form-urlencoded(key: value) rather then json req.body we use this middleware
app.use(express.urlencoded({extended:false}));

//routes
app.get("/", (req, res) => {
  res.send("hello NODE API");
});
app.get("/blog", (req, res) => {
  res.send("hello Block, My name is Nisarga");
});


//fetch data from db
app.get("/products", async(req,res)=>{
     try {
        const products = await Product.find({});
        res.status(200).json(products);
     } catch (error) {
           res.status(500).json({"message": error.message})
     }
})

//fetch single product based on id
app.get("/products/:id", async(req, res)=>{
    try {
        const {id} = req.params
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({"message": error.message})
    }
})
//sending data to db
app.post("/products", async(req,res)=>{
    try {
        const product =  await Product.create(req.body);
        res.status(200).json(product);
        
   
       } catch (error) {
           console.log(error.message);
           res.status(500).json({"message": error.message})
       }
})

// update data in db
app.put("/products/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        //if we cannot find any product in database
        if(!product){
            return res.status(404).json({"message":`cannot find  any product with ID ${id}`});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({"message": error.message})
    }
});

// delete a data from db
app.delete("/products/:id", async(req,res)=>{
    const {id} = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({"message":`cannot find  any product with ID ${id}`});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({"message": error.message})
    }
})

//mongodb connection
mongoose
  .connect(
    "mongodb+srv://nodeAPIadmin:nodeAPIadmin123@nodeapiyoutube.w2918ap.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongodb");
    app.listen(3000, () => {
        console.log("Node API app is running on port 3000");
      });
    
  })
  .catch((err) => {
    console.log(err);
  });
