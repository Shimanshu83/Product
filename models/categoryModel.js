const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryId : {type : String , unique : true , required : true} ,
    categoryName : {type : String , required : true},
},{timestamps : true })

module.exports = mongoose.model('Categorys' , categorySchema); 