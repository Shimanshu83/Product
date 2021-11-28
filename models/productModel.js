const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productId : {type : String , unique : true , required : true ,sparse : true} ,
    productName : {type : String , required : true},
    qtyPerUnit : {type : Number , required : true},
    unitInStock : {type : Number , required : true},
    discontinued : {type : Boolean , required : true , default : false} ,
    categoryId : {type : String } ,
},{timestamps : true })

module.exports = mongoose.model('Products' , productSchema); 
