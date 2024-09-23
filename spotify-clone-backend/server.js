import express from "express"
import cors from "cors"
import "dotenv/config"
import songRouter from "./src/routes/songRoute.js";
import connectDB from "./src/config/mongoDB.js";
import connectCloudinary from "./src/config/cloudinary.js";
import albumRouter from "./src/routes/albumRoute.js";

//App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
//Using cors we allow to connect frontend with backend
app.use(cors());

//intializing routes

app.use("/api/song",songRouter);
app.use("/api/album",albumRouter);
app.get('/',(req,res)=>{
    res.send("API working")
});
app.listen(port,(req,res)=>{
    console.log(`server started on ${port}`)
})