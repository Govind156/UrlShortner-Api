const mongoose=require('mongoose')

const urlschema=mongoose.Schema({
    shortid:{
        type:String,
        required:true,
        unique:true,
    },
    redirecturl:{
        type:String,
        required:true,

    },
    visitedhistory:
        [{timestamp:{type:Number}}],
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    }    
},{timestamps:true})

const urlmodel=mongoose.model('url',urlschema);
module.exports={
    urlmodel,
}
