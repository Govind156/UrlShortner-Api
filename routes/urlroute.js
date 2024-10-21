
const {
    handleGenerateNewUrl,
    handleGetAnalytics}
    =require("../controllers/urlcontroller")

    const express=require("express")
const { handleUserSignUp } = require("../controllers/usercontroller")
const router=express.Router()

router.post("/",handleGenerateNewUrl)
router.get("/analytics/:shortid",handleGetAnalytics);
module.exports=router 