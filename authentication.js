//stateful authentication
// const sessionIdToUserMap=new Map()

// function getuser(id){
//     return sessionIdToUserMap.get(id)
// }
// function setuser(id,user){
//     sessionIdToUserMap.set(id,user);
// }
// module.exports={
//     getuser,
//     setuser,
// }

//stateless authentication
const jwt=require("jsonwebtoken")
const secret="ab@12ab"
function setuser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email,
        roles:user.roles,
    },secret)
}

function getuser(token){
    if(!token)
        return null;
    try{
        return jwt.verify(token,secret)

    }catch(error){
        return null;
    }
}

module.exports={
    getuser,setuser,
}