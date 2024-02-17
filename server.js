const express = require("express");
const app = express();

//routes
app.get("/",(req,res)=>{
    res.send("hello NODE API");
})
app.listen(5000,()=>{
    console.log("Node API app is running on port 5000")
})