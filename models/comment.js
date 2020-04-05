const mongoose=require('../config/mongoose');

const commentSchema=new mongoose.Schema(
    {
        content:{
            type:String,
            required:true,
        },
        //comment belong to the user
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        post:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post',
        },
    },
    {
        timestamp:true
    }

    );

    const Comment=mongoose.model('Comment',commentSchema);

    module.exports=Comment;