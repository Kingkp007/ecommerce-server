const productModel = require("../models/productModel")


const newProdController = async (req, res) => {
    try {
        const { productname, price, stock, category } = req.body;
        const photo = req.file.filename
        console.log("name " + productname);
        console.log("price " + price);
        console.log("stock " + stock);
        console.log("category " + category);
        console.log("photo " + photo);
        const newProduct = new productModel({ name: productname, photo: photo, price: price, stock: stock, category: category, photo: photo })
        await newProduct.save();
        res.status(200).send({ success: true, message: `Got data` })


    } catch (error) {
        console.log(`Adding new product failed. Error : ${error}`);
        res.status(500).send({
            success: false,
            message: `newProcutController failed ${error.message}`
        })
    }
}

const getProdController = async (req, res) => {
    const page = parseInt(req.query.page);
    const pageSize = 8 ;
    const search = req.query.search ;
    try {
        const query = {
            name: { $regex: new RegExp(search, 'i') }, // Case-insensitive search
          };
        const count = await productModel.estimatedDocumentCount();
        const totalPages = Math.ceil(count/pageSize);
        let products ;
        if(search !== "" || search !== null){
             products = await productModel.find(query).skip((page-1)*pageSize).limit(pageSize);
             console.log(`Query is: ${search}`)
             console.log(`found products ${products}`)
        }
        if(search == "" || search == null){
             products = await productModel.find().skip((page-1)*pageSize).limit(pageSize);
             console.log(`Query is null so showing all data`)
        }    
        console.log(count)
        res.status(200).send({ success: true, message: "All Products data fetched successfully", data: {products, totalPages},})

    } catch (error) {
        res.status(500).send({ success: false, message: `Something went wrong Error : ${error}` })
    }
}

const getProdById = async(req,res) => {
    const id = req.query.id ;
    try {
        let product
        if(id){
            product = await productModel.findOne({ _id: id });
        }
        res.status(200).send({success:true, message: `Product for id ${id} fetched successfully`, data:{product}})
    } catch (error) {
        console.log('Got Error' + error)
        res.status(500).send({success:false, message: `Something went wrong. Error : ${error}`})
    }
}

module.exports = { newProdController, getProdController, getProdById }