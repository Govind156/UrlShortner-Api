const express=require('express')
const router=express.Router();
const {handleUserSignUp,handleUserLogIn}=require('../controllers/usercontroller')
router.post('/',handleUserSignUp)
router.post('/login',handleUserLogIn)
module.exports=router 