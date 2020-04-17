const User=require('../../../models/user');
const jwt=require('jsonwebtoken');


module.exports.createSession= async function(req,res){
    try {
        let user=await User.findOne({email:req.body.email});

        if(!user || user.password!=req.body.password)
        {
            return res.json(422,{
                message:"Invalid username or Password",
            })
        }

        return res.json(200,{
            message:"Sign in successfully,please keep your token safe buddy",
            data:
            {
                token:jwt.sign(user.toJSON(),'codeial',{expiresIn:100000})
            }
        });
        
    } catch (error) {

        console.log("ERROR",error);
        return res.json(500,{
            message:"Internal server Error",
        })
        
    }
}