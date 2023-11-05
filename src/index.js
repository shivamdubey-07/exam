const express=require("express")

const app=express();
const mongoose= require("mongoose")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors=require("cors")


app.use(cookieParser());

const corsOptions = {
  origin:"http://localhost:3000", //included origin as true
  credentials: true, //included credentials as true
};
app.use(cors(corsOptions));







// Use the cookie-parser middleware




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("./db/db")



const authRoutes=require("./routes/auth")

app.use("/api",authRoutes)
app.get("/jwt",(req,res)=>{
  const t=req.cookies.jwt;
  console.log("......................................................................................",t);
})


app.post("/fsfs",(req,res)=>{
  // console.log(req.body)
  // res.json(req.body)
  res.send("send")
})




app.get("/",(req,res)=>{
  res.send("hello sir welcome")
})


  

app.listen(9000,()=>{
  console.log("running")
})