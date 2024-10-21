const {urlmodel}=require("../model/urlmodel")
const shortid=require("shortid")
const express=require("express")

async function handleGenerateNewUrl(req,res){
    const body=req.body
    // const useruid=req.body.uid
    // if(!useruid)
    //     return res.redirect("/login")
    // const user=req.user
    // console.log(user)
    // if(!user){
    //     res.redirect("/login")
    // } 
    if(!body.url)
        return res.status(400).json({msg:"id required"})
    
    const SHORTID=shortid();
    const result=await urlmodel.create({
        shortid:SHORTID,
        redirecturl:body.url,
        visitedhistory:[],
        createdby:req.user._id,
    })
    return res.render("home",{
        id:SHORTID,
    })
    // return res.json({id:SHORTID}) 
}
async function handleGetAnalytics(req,res){
    const shortid=req.params.shortid
    const result=await urlmodel.findOne({shortid})
    return res.json({
        totalclicks:result.visitedhistory.length,
        analytics:result.visitedhistory,
    })
}
 
module.exports={handleGenerateNewUrl,handleGetAnalytics}