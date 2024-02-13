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
    const pageSize = 8;
    const search = req.query.search;
    const category = req.query.category;
    try {
        let query = {};
        if (search) {
            query.name = { $regex: new RegExp(search, 'i') }; // Case-insensitive search
        }
        if (category) {
            query.category = category; // Filter by category if present
        }

        let products = [];
        if (search || category) {
            // If search or category is provided, first filter by those criteria
            products = await productModel.find(query);
        } else {
            // If neither search nor category is provided, fetch all products
            products = await productModel.find();
        }

        const totalCount = products.length;
        const totalPages = Math.ceil(totalCount / pageSize);

        // Perform pagination after filtering by search and/or category
        products = products
            .slice((page - 1) * pageSize, page * pageSize)
            .map(product => ({
                ...product._doc,
                img: `http://localhost:8080/uploads/${product.photo}`
            }));


        // const query = {
        //     name: { $regex: new RegExp(search, 'i') }, // Case-insensitive search
        //   };
        // const count = await productModel.countDocuments(query);
        // const totalPages = Math.ceil(count/pageSize);
        // let products ;
        // if(search !== "" || search !== null){
        //      products = await productModel.find(query).skip((page-1)*pageSize).limit(pageSize);
        //     //  console.log(`Query is: ${search}`)
        //     //  console.log(`found products ${products}`)
        //      products = products.map(product => ({
        //         ...product._doc,
        //         img: `http://localhost:8080/uploads/${product.photo}`
        //     })
        //     );
        //     //  console.log(`found products ${products}`)
        // }
        // if(search == "" || search == null){
        //      products = await productModel.find().skip((page-1)*pageSize).limit(pageSize);
        //      console.log(`Query is null so showing all data`)

        //      products = products.map(product => ({
        //         ...product._doc,
        //         img: `http://localhost:8080/uploads/${product.photo}`
        //     }));
        //     //  console.log(`found products ${products}`)
        // } 
        // console.log(`found products ${products}`)
        // console.log(`found products ${JSON.stringify(products)}`);
        res.status(200).send({ success: true, message: "All Products data fetched successfully", data: { products, totalPages }, })

    } catch (error) {
        res.status(500).send({ success: false, message: `Something went wrong Error : ${error}` })
    }
}

const getProdById = async (req, res) => {
    const id = req.query.id;
    try {
        let product;
        if (id) {
            product = await productModel.findOne({ _id: id });
            if (product) {
                product = {
                    ...product._doc,
                    img: `http://localhost:8080/uploads/${product.photo}`
                };
                res.status(200).send({ success: true, message: `Product for id ${id} fetched successfully`, data: { product } });
                return; // Exit early after sending response
            }
            // res.status(200).send({success:true, message: `Product for id ${id} fetched successfully`, data:{products}})
        }
        res.status(200).send({ success: false, message: `No product Found` })

    } catch (error) {
        console.log('Got Error' + error)
        res.status(500).send({ success: false, message: `Something went wrong. Error : ${error}` })
    }
}

const getProdByCategory = async (req, res) => {
    const category = req.query.category;
    console.log(category);
    try {
        let product;
        if (category) {
            product = await productModel.find({ category: category });
            if (product) {
                console.log(product.length);
            }
        }
        res.status(200).send({ success: true, message: 'Fetch Successful', data: product })

    } catch (error) {
        console.log('Got Error' + error)
        res.status(500).send({ success: false, message: `Something went wrong. ${error}` })
    }
}


module.exports = { newProdController, getProdController, getProdById, getProdByCategory }