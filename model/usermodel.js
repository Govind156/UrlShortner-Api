//import built-in package
const mongoose=require('mongoose')

const userschema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
},{timestamps:true})
const usermodel=mongoose.model('usermodels',userschema)
module.exports=usermodel