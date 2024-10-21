const { urlmodel } = require("../model/urlmodel");
const usermodel=require("../model/usermodel")
//uuid package k andar v4 kuch hote hai uska naam humne uuidv4 rekha diya hai .yah package hum isliye use kar rahe hai taki hum cookies generate kar sake jab b koi user login kare.cookie uuid contain kargi
const {v4:uuidv4}=require('uuid')
const {setuser}=require("../authentication")

async function handleUserSignUp(req,res){
    const {name,email,password}=req.body;
    if(!name || !email || !password){
         return res.redirect("signup")
    }
    const result=await usermodel.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    })
    const allurls=await urlmodel.find({})
    return res.render("home",{urls:allurls})
}

async function handleUserLogIn(req,res){
    const {email,password}=req.body;
    
    
    if(!email || !password){
        return res.end("both are required")
    }
    const useruid=uuidv4()
    const user=await usermodel.findOne({email,password})
    
    if(!user){

        // return res.render("signup")
        return res.render("login",{error:"invalid username or password"})
    }
    setuser(useruid,user)
    res.cookie("uid",useruid)
    return res.redirect("/")
}
module.exports={handleUserSignUp,handleUserLogIn}