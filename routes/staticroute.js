const express=require('express')
const { urlmodel } = require('../model/urlmodel')
const app=express()
const router=express.Router()

router.get("/",async(req,res)=>{
     if(!req.user)
         return res.redirect("/login")
        const allurl=await urlmodel.find({createdby:req.user._id})
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