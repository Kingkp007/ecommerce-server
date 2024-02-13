const express = require("express")
const router = express.Router()
const upload = require("../middlewares/fileUpload")
const {getProdController, newProdController, getProdById, getProdByCategory } = require("../controllers/productController") 


router.post("/new-product",upload.single("file"), newProdController);

router.get("/get-prod", getProdController);

router.get("/getbyid", getProdById);

router.get("/getProdByCtg", getProdByCategory)

module.exports = router ;