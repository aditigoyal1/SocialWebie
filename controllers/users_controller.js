const User=require("../models/user");


module.exports.profile=function(req,res)
{
    return res.render('user_profile',{
        title:"user profile",
    })
}

module.exports.signUp=function(req,res)
{
    return res.render('user_sign_up',{
        title:"Codeial| Sign Up",
    })
}

module.exports.signIn=function(req,res)
{
    return res.render('user_sign_in',{
        title:"Codeial| Sign In",
    })
}


module.exports.create=function(req,res)
{
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');

    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("Error in finding the User in Signning Up");
            return;
             }

         if(!user)
         {
             User.create(req.body, function(err,user){
                 if(err)
                 {
                     console.log('Error in creating the User');
                     return;
                 }

                 return res.redirect('/users/sign-in');
             })
         }else{
             return res.redirect('back');
         }   
        

    });


}

module.exports.createSession=function(req,res)
{
    return res.redirect('/');
}


