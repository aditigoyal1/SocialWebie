const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');


passport.use(new googleStrategy({
    clientID:"304233899193-31lpfeag5phdv8m5c2765kqpd96um0j1.apps.googleusercontent.com",
    clientSecret:"mciehbH2BNvv7tKfrdQAomUI",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},
function(accessToken,refreshToken,profile,done)
{
    //find a user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){console.log("error in google strategy-passport",err);return;}

        console.log(profile);

        if(user)
        {
            return done(null,user);
        }

        else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex'),
            },
            function(err,user)
            {
                if(err){console.log("Error in creating the user google strategy-passport");return;}

                return done(null,user);
            })
        }
    })
}

));

module.exports=passport;
