const orderModel = require('../models/orderModel')
const productModel = require("../models/productModel")
// const mongoose = require('mongoose')


const addItemCtrl = async (req, res) => {
    try {
        const { cartItems, userId } = req.body;
        const order = new orderModel({
            productId: cartItems,
            user: userId
        });
        const savedOrder = await order.save();
        res.status(201).send({ success: true, message: ' Data update to DB', data: savedOrder })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: `Something went wrong. Error - ${error}` })
    }

}

const getItemList = async (req, res) => {
    try {
        const userId = req.query.userId;

        const cartList = await orderModel.find({ user: userId });
        if (!cartList) {
            res.status(200).send({ success: true, message: 'Items not found for this userId' })
        }

        let itemsAssociatedWithUser = [];
        const productPromises = cartList.map(async (item) => {
            let singleProduct = await productModel.findOne({ _id: item.productId });
            singleProduct = {
                ...singleProduct._doc,
                img: `http://localhost:8080/uploads/${singleProduct.photo}`,
            };
            return singleProduct; 
        });
        
        Promise.all(productPromises)
            .then((products) => {
                itemsAssociatedWithUser = products;
                console.log(itemsAssociatedWithUser)
                res.status(200).send({ success: true, message: "Items found for user", data: itemsAssociatedWithUser })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
             
        // res.status(200).send({ success: true, message: "Items found for user", data: itemsAssociatedWithUser })
    } catch (error) {
        res.status(500).send({ success: false, message: `Something went wrong. Error - ${error}` })
    }
}

const deleteItemCtrl = async(req,res) =>{
    const userId= req.query.userId;
    const prodId = req.query.prodId;
    try {
        const result = await orderModel.deleteOne({ user: userId, productId: prodId });
        if (result.deletedCount === 1) {
            res.status(200).json({ success: true, message: "Data deleted successfully" });
        } else {
            res.status(404).json({ success: false, message: "Data not found for deletion" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: `Error deleting data: ${error.message}` });
    }
} 



module.exports = { addItemCtrl, getItemList,deleteItemCtrl }
