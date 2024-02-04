const express = require("express")
const router = express.Router()
const upload = require("../middlewares/fileUpload")
const {getProdController, newProdController, getProdById } = require("../controllers/productController") 


router.post("/new-product",upload.single("file"), newProdController);

router.get("/get-prod", getProdController);

router.get("/getbyid", getProdById);

module.exports = router ;