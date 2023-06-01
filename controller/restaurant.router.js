const express= require("express");
const { restaurantModel } = require("../model/retaurant.model");
const retaurantRouter= express.Router();


retaurantRouter.get("/api/restaurants",async (req,res)=>{
    try {
       const allRes= await restaurantModel.find();
       res.status(200).send({"msg":"all restaurants","data":allRes})
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})


// get res  by id
retaurantRouter.get("/api/restaurants/:id",async (req,res)=>{
    try {
        let restaurant=await restaurantModel.findById({_id:req.params.id})
        res.status(200).send(restaurant)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

// add a restaurant
retaurantRouter.post('/api/restaurants', async (req, res) => {
    try {
        const { name, address, menu } = req.body;
        const addRestaurant = new restaurantModel({ name, address, menu });
        await addRestaurant.save();
        res.status(200).send({
            msg: 'Your restaurant has been added.'
        })
    } catch {
        res.status(400).send({ error: error.message })

    }
})


// post item to restaurant menu
retaurantRouter.post("/api/restaurants/:id/menu",async (req,res)=>{
    try {
        await restaurantModel.updateOne({_id:req.params.id},{$push:{menu:req.body}})
        res.status(200).send({
            msg:"your menu has been updated",
            data:await restaurantModel.find({_id:req.params.id})
        })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})


// delete a menu
retaurantRouter.delete('/restaurants/:id1/menu/:id2', async (req, res) => {
    try {
        const id1 = req.params.id1;
        const id2 = req.params.id2;
        await restaurantModel.updateOne({ _id: id1 }, { $pull: { menu: { _id: id2 } } });
        res.status(202).send({"msg":"menu deleted successfully"})
    } catch {
        res.status(400).send({ error: error.message })
    }
})

module.exports={retaurantRouter}