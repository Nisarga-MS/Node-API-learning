const errorMiddleware =(err,req,res,next)=>{
 console.log("here is an error middleware");
 //we dont want to show error to all so the condition is applied(to make secure server)
 const statusCode = res.statusCode ? res.statusCode: 500
 res.status(statusCode);
 res.json({message:err.message, stack:process.env.NODE_ENV === "development" ? err.stack : null})
}

module.exports = errorMiddleware

// setting up error middleware in nodejs using express