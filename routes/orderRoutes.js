const express = require("express");
const router = express.Router();
const {addItemCtrl, getItemList, deleteItemCtrl} = require('../controllers/orderController')

router.post('/add-item', addItemCtrl)
router.get('/getItems', getItemList)
router.delete('/delete-item', deleteItemCtrl)

module.exports = router ;