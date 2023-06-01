const express = require('express');
const { orderModel } = require('../model/order.model');
const orderRouter = express.Router();

orderRouter.post('/orders', async (req, res) => {
    try {
        const { user, restaurant, items, totalPrice, deliveryAddress, status } = req.body;
        const newOrder = new orderModel({ user, restaurant, items, totalPrice, deliveryAddress, status });
        await newOrder.save()
        res.status(201).send({
            msg: "your order has been placed.",
            data: newOrder
        })
    } catch {
        res.status(400).send({ error: error.message })
    }
})


orderRouter.get('/order/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = await orderModel.find({ user: id });
        res.status(200).send({
            data: data
        })
    } catch {
        res.status(400).send({ error: error.message })

    }
})

orderRouter.patch('/orders/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await orderModel.findByIdAndUpdate({ _id: id }, req.body);
        res.status(200).send({
            msg: "your order has been updated"
        })
    } catch {
        res.status(400).send({ error: error.message })

    }
})

module.exports = { orderRouter };