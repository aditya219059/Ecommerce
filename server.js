import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import contactRoute from "./routes/contactRoute.js"
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

//configure env
dotenv.config();

//DB config
connectDB();

//ES module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "./client/build")))



app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/contact', contactRoute);

//rest api
app.use('*', function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

//rest api
app.get('/', (req, res) => {
    res.send("<h1>Welcome</h1>");
})

const port = process.env.PORT;


app.listen(port, () => {
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${port}`);
});
