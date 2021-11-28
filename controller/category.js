const Category = require('../models/categoryModel') ;



const createCategory = async (req , res ) => {

    const category = req.body ;  // get the Category from the request body

    try {

        const alreadyExist = await Category.findOne({categoryId : category.categoryId}) ; 

        if (alreadyExist){
            return  res.status(400).send("This Category Id  already exists try giving different Category Id");
        }
        else {

            var newCategory = new Category(category) ; 

        }
        try{
            newCategory = await newCategory.save(newCategory) ; 
            return res.status(200).json(  {success : true , result : newCategory } );
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


module.exports = {createCategory}