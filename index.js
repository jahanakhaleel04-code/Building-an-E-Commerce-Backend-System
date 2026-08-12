import express from "express";
import mongoose from  "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./config/dbConnection.js";
import userRoutes from "./routes/userProfileRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

dotenv.config();
 
const app = express();
 
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://module-5-frontend-xi.vercel.app/"
  ],
  credentials: true
}));
//middlewares
app.use(express.json());


app.use('/api/users',userRoutes)
app.use('/api/products',productRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/activities',analyticsRoutes)



//routes


app.get('/',(req,res)=>{
    res.send('running...')
})
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})


