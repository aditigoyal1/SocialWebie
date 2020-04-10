   const express=require('express');
   const app=express();
   const port=8000;
   const db=require('./config/mongoose');
  
   const session=require('express-session');
   const passport=require('passport');
   const passportLocal=require('./config/passport-local-strategy');
   
   const expressLayouts=require('express-ejs-layouts');
   const cookieParser=require('cookie-parser');

   const sassMiddleware=require('node-sass-middleware');
   const flash= require("connect-flash");
   const customMware=require('./config/middleware');

   app.use(sassMiddleware({
     src:'./assets/scss',
     dest:'./assets/css',
     debug:true,
     outputStyle:'extended',
     prefix:'/css'
   }));




   app.use(express.urlencoded());
   app.use(cookieParser());
   
   //set up static files
   app.use(express.static('./assets'));
  

   app.use(expressLayouts);
 
   

   //extract style and scripts from sub pages into th layouts

   app.set('layout extractStyles',true);
   app.set('layout extractScripts',true);

   
   // set up th view engine
   app.set('view engine','ejs');
   app.set('views','./views');
   


   app.use(session({
     name:'codeial',
     //TODO later
     secret:'blahsomething',
     saveUninitialized:false,
     resave:false,
     cookie:{
       maxAge:(1000*60*100)
     }

   }));

   app.use(passport.initialize());
   app.use(passport.session());

   

   app.use(passport.setAuthenticatedUser);

   app.use(flash());
   app.use(customMware.setFlash);



   //use routes
   app.use('/',require('./routes'));



   app.listen(port,function(err){
       if(err)
       {
           console.log(`Error in running the server: ${err}`);

       }
       console.log(`Server is up on port number ${port}`);
       
   });

