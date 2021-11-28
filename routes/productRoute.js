const router = require('express').Router() ;
const {createProduct , readProduct , readAllProduct , updateProduct , deleteProduct}  = require('../controller/product') ;

router.post('/create' , createProduct);

router.get('/read/:id' , readProduct);

router.get('/readAll' , readAllProduct);

router.put('/update/:id' , updateProduct);

router.delete('/delete/:id' , deleteProduct);

module.exports = router;
