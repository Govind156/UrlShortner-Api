const express=require('express')
const { urlmodel } = require('../model/urlmodel')
const { restrictTo } = require('../middleware/auth')
const app=express()
const router=express.Router()

router.get("/",restrictTo(["normal","admin"]),async(req,res)=>{
    let allurl=null;
    if(req.user.roles === "admin"){
        allurl=await urlmodel.find({})
    }else{
        allurl=await urlmodel.find({createdby:req.user._id})
    }     
    // const allurl=await urlmodel.find({})
    return res.render('home',{
        urls:allurl,
    })
})

router.get("/signup",async(req,res)=>{
    return res.render("signup")
})

router.get("/login",async(req,res)=>{
    return res.render("login")
})


module.exports=router