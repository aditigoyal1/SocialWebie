const Post=require('../models/post');
const User=require('../models/user');

module.exports.home= async function(req,res){
    // Post.find({},function(err,posts)
    // {
    //     return res.render('home',{
    //     title:"Home",
    //     posts:posts,
    // });

    // });
    try {
        let posts=await Post.find({})
        .sort('_createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user',
            }
        });

        let user=await User.find({});

        return res.render('home',{
        title:'Codeial | Home',
        posts:posts,
        all_users:user });
        
    } catch (err) {
        console.log("Error",err);
        return;
        
    }

    
}