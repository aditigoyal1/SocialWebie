   const express=require('express');
   const app=express();
   const port=8000;

   const expressLayouts=require('express-ejs-layouts');
   const db=require('./config/mongoose');

   app.use(expressLayouts);

   //set up static files
   app.use(express.static('./config/mongoose'));

   //extract style and scripts from sub pages into th layouts

   app.set('layout extractStyles',true);
   app.set('layout extractScripts',true);




   //use routes

   app.use('/',require('./routes'));



   // set up th view engine
   app.set('view engine','ejs');
   app.set('views','./views');
   
   app.listen(port,function(err){
       if(err)
       {
           console.log(`Error in running the server: ${err}`);

       }
       console.log(`Server is up on port number ${port}`);
       
   });

