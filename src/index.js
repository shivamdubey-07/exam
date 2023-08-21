const express=require("express")
const app=express();
const mongoose= require("mongoose")
const bodyParser = require('body-parser');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("./db/db")
const cors=require("cors")

app.use(cors())
const authRoutes=require("./routes/auth")

app.use("/api",authRoutes)


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