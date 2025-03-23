const {Schema, model} = require('mongoose')

const postSchema = new Schema({
    title:{type:String, require:true},
    category:{type:String, enum:["Technology", "Social Media", "Entertainment", "Business","IT"], message: "{VALUE is not supported}"},
    desc:{type:String, require:true},
    img:{type:String, require:true},
    creator:{type:Schema.Types.ObjectId, ref:"User"},},
{timestamps:true})

module.exports = model("Post",postSchema)