const router = require('express').Router() ;
const {createCategory} = require('../controller/category.js') ;

router.post('/create' , createCategory);

module.exports = router;
