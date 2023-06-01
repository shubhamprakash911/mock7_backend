const jwt= require("jsonwebtoken")
require("dotenv").config()


const authantication=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
         jwt.verify(token,process.env.secretKey,(err,decoded)=>{
            if(decoded){
                req.body.userId=decoded.userId
                req.body.restaurantId=decoded.restaurantId
                next()
            }else{
                res.send({"msg":"not authorized"})
            }
         })
    }else{
        res.send({"msg":"not authorized"})
    }
}

module.exports={authantication}