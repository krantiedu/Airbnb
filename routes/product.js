var mongoose = require("mongoose");


var productSchema = mongoose.Schema({
  userid : {type : mongoose.Schema.Types.ObjectId, ref:"user"},
  city: String ,
address: String,
date:String,
price:String
  
})

module.exports = mongoose.model("product", productSchema)