const express =require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller')


console.log("router loaded");

router.get('/',homeController.home);

//for any other routes
router.use('/users',require('./users'));
router.use('/post',require('./post'));
router.use('/comments',require('./comments'));
router.use('/api',require('./api'));

module.exports=router;


