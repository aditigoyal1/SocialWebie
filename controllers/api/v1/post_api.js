const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

module.exports.index= async function(req,res){

    let post= await Post.find({})
    .sort('_createdAt')
    .populate('user')
    .populate({
        path:"comments",
        populate:{
            path:'user',
        }

    });



    

    return res.json(200,{
        message:"List of posts ",
        posts:post

    });
}

module.exports.destroy= async function(req,res)
{
    try {
        let post= await Post.findById(req.params.id);
        

        if(post.user==req.user.id)
        {
       
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            
            // if(req.xhr)
            // {
            //   return  res.status(200).json({
            //         data:{
            //             post_id:req.params.id,
            //         },
            //         message:"post deleted! ",

            //     });
            // }


            //req.flash('success',"Post and associated comments deleted");

            return res.json(200,{
                message:"Post and associated comments deleted Successfully"
                
            });
        }
        
        else{
            return res.json(401,{
                message:"you cannot delete this post!"
            })
        }
        
    } catch (error) {
        console.log("error",error);
    
       return res.json(500,
        {
            message:"Internal Error",
        });
        
    }

}