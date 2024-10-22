const {getuser}=require("../authentication")
//middleware for authentication
function checkforAuthentication(req,res,next){
    const tokencookie=req.cookies?.uid;
    req.user=null
    if(!tokencookie)
        return next()
    const token=tokencookie
    const user=getuser(token)
    req.user=user 
    next()

}

//middleware for authorization
function restrictTo(role=[]){
    //closure
    return function(req,res,next){
        if(!req.user)
            return res.redirect('/login')

        if(!role.includes(req.user.roles))
            return res.end("unauthorised")

        return next()
    }
}

// async function  restricttologgedinuseronly(req,res,next){
//     const  useruid=req.cookies?.uid
//     console.log(useruid)
//     if(!useruid){
//         return res.redirect("/login")
//     } 
//     const user=getuser(useruid)
//     if(!user){
//         return res.redirect("/login")
//     }
//     req.user=user 
//     next()
// }
// async function checkauth(req,res,next){
//     const useruid=req.cookies?.uid 
//     const user=getuser(useruid)
//     req.user=user 
//     next()
// }

module.exports={checkforAuthentication,restrictTo}