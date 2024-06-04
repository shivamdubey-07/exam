const express=require("express")

const app=express();
const mongoose= require("mongoose")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors=require("cors")


app.use(cookieParser());

const corsOptions = {
  origin:"https://examquiz-sepia.vercel.app",
  credentials: true,
};
app.use(cors(corsOptions));











app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("./db/db")



const authRoutes=require("./routes/auth")

app.use("/api",authRoutes)
app.get("/jwt",(req,res)=>{
  const t=req.cookies.jwt;
  console.log("......................................................................................",t);
})







app.get("/",(req,res)=>{
  res.send("hello sir welcome")
})


  

app.listen(9000,()=>{
  console.log("running")
})