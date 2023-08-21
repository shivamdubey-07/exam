const mongoose= require("mongoose")
const dotenv = require("dotenv");

dotenv.config();


mongoose.connect("mongodb+srv://shivamdubey:IamMahi07@cluster0.jvlvmfh.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedtopology:true,
})
.then(()=>{
    console.log("connected to mongo");
})
.catch((err)=>{
    console.log(err);
})
