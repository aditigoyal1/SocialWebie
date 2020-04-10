const Passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');

Passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true,
},
function(req,email,password,done)
{
    User.findOne({email:email},function(err,user){
        if(err){
            //console.log('Error in finding user -->Passport');
            req.flash('error',err);
            return done(err);
        }
        if(!user || user.password!=password)
        {
            //console.log('Invalid Username/Password');
            req.flash('error',"Invalid User/Password");
            return done(null,false);
        }
        return done(null,user);
    })
}
));


//serializing the user to decide which key is to kept in the cookie

Passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookie
Passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user)
    {
        if(err)
        {
            console.log('Error in finding the user-->passport'+err);
            return done(err);

        }
        return done(null,user);
    });
});

//check if the user is authenticated

Passport.checkAuthentication=function(req,res,next){
    //if the user is signed in,then pass on the req to thenxt function(controller's action)
    if(req.isAuthenticated())
    {
        return next();
    }
    //if the user is not signed in 
    return res.redirect('/users/sign-in');
}

Passport.setAuthenticatedUser=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        res.locals.user=req.user;

    }
    next();
}

module.exports=Passport;

