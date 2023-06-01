const express = require("express");
const {connection} = require("./config/db");
const { userRouter } = require("./controller/user.router");
const { retaurantRouter } = require("./controller/restaurant.router");
const { orderRouter } = require("./controller/order.router");
const { authantication } = require("./middleware/authantication.middleware");
require("dotenv").config()
const app = express();

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Backend application")
})

app.use(userRouter)
app.use(retaurantRouter)
app.use(authantication)
app.use(orderRouter)

app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log("successfully connected to database")
    } catch (error) {
        console.log(error)
    }
    console.log("server is listing at port ",process.env.port)
})