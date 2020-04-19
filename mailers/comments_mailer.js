const nodemailer=require('../config/nodemailer');

exports.newComments=(comment)=>{
    console.log("Inside comment Mailer",comment);

    nodemailer.transporter.sendMail({
        from:'codeial@gmail.com',
        to:comment.user.email,
        subject:"New Comment Published",
        html:"<h2> yup,Your comment is now published</h2>",
 },  
 function(err,info){
     if(err)
     {
         console.log("Error in sending mail ",err);
         return;
     }
     console.log("Message Sent ", info);
     return;

 });
}