const mongoose = require("mongoose")

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/DeadTargetDatabase",  { useNewUrlParser: true })
.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("failed to connect")
})


const loginSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    }
})

const collection = new mongoose.model("LoginData", loginSchema)
module.exports = collection