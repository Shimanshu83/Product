const Product = require('../models/productModel') ;
const Category = require('../models/categoryModel') ;

const createProduct = async (req , res ) => {
    const product = req.body ;  // get the product from the request body
    try {

        const alreadyExist = await Product.findOne({productId : product.productId}) ; 

        if (alreadyExist){
            return  res.status(400).send("This Product Id is already exists try giving different Product Id");
        }
        else {

            var newProduct = new Product(product) ; 

        }
        try{
            newProduct = await newProduct.save(newProduct) ;
            category = await Category.findById(newProduct.categoryId) ; 
            return res.status(200).json(  {success : true , result : {...newProduct._doc , category : category}}) ; 
        }
        catch(error){

            console.log(error) ; 
            return res.status(500).json({
                err : "error occured"
            })
        }


    }
    catch (err){

        

        return res.status(500).json({
                err : "error occured"
            })

    }



} ; 

const readProduct = async (req , res ) => {
    
    try {
        const product = await Product.findById(req.params.id) ;
        const category = await Category.findById(product.categoryId) ;
        return res.status(200).json({
            success : true ,
            result : {...product._doc , category : category} 
        }) 
    } catch (error) {
        console.log(error) ;
        return res.status(500).json({err : 'server error'}) 
    }
    
    
} ; 

const readAllProduct = async (req , res ) => {
    try {
        
        var products = await Product.find() ;

        var result = await Promise.all(products.map(async (product) => {
            const category = await Category.findById(product.categoryId) ;
            const result = {category , ...product._doc} ;
            return result ; 
        }) );
        console.log(result)  ;

        return res.status(200).json({
            success : true ,
            result : result
        }) 

    } catch (error) {

        console.log(error) ;
        return res.status(500).json({err : 'server error'}) 
        
    }

    
} ; 

const updateProduct = async (req , res ) => {

    const {productName, qtyPerUnit, unitInStock, discontinued ,  categoryId  }  = req.body ; 
    const updatedData  = {
        productName, qtyPerUnit, unitInStock, discontinued ,  categoryId 
    }
    try {
        console.log(req.params.id) ;
        try{
            var updatedProduct = await Product.findByIdAndUpdate(req.params.id , updatedData  , {new : true } );
            console.log(updatedProduct) ;

        }
        catch (err) {
            console.log(err)
        }
    const category = await Category.findById(updatedProduct.categoryId) ; 
    res.status(201).send({sucess : true , msg : "successfully updated" , result : {...updatedProduct._doc , category : category}  });
    }
    catch(err){
        console.log(err) ; 
        return res.status(500).send({err : "internal server error "})
    }
} ; 


const deleteProduct = async (req , res ) => {

    try{
        let deleted = await Product.findByIdAndDelete(req.params.id);
        res.status(201).send({sucess : true , msg : "successfully deleted"});
    }
    catch(err){
        res.status(500).send({err : "internal server error"})
    }
    
} ; 


module.exports = { readProduct , deleteProduct , createProduct , readAllProduct , updateProduct } ;