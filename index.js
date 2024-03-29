const express = require("express");
// const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const cors = require("cors")


// const path = require('path');

//dotenv conig
dotenv.config();

//mongodb connection
connectDB();

//rest obejct
const app = express();


// Use CORS middleware
app.use(cors());

//middlewares
app.use(express.json());
app.use(moragan("dev"));
app.use('/uploads', express.static('uploads'));

// routes
app.use("/api/v1/products",require('./routes/productRoutes') )
app.use("/api/v1/users", require("./routes/userRoutes"))
app.use("/api/v1/orders", require("./routes/orderRoutes"))





//port
const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
    console.log(
        `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
    );
});