const mongoose = require("mongoose")

const menuSchema= mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String
})

const restaurantSchema= mongoose.Schema({
  name: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  menu: [menuSchema]
})

const restaurantModel= mongoose.model("restaurant",restaurantSchema)

module.exports={restaurantModel}