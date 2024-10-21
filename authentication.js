const sessionIdToUserMap=new Map()

function getuser(id){
    return sessionIdToUserMap.get(id)
}
function setuser(id,user){
    sessionIdToUserMap.set(id,user);
}
module.exports={
    getuser,
    setuser,
}