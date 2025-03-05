const nodemailer=require("nodemailer");

const sendEmail=async (email,subject,html)=>{
    // console.log("Sending Email");
    // console.log(email);
    // console.log(subject);
    // console.log(html);

    //const emailIds = email.join(" ,");

    let transporter=nodemailer.createTransport({
        service:"Gmail",
        auth:{
            user:"utkarsh.malik_1@scaler.com",
            pass:"psuyqcmoakrmfzpe"
        }
    });
    let mailDetails={
        from:"utkarsh.malik_1@scaler.com",
        to:email,
        subject:subject,
        html:html
    }
    transporter.sendMail(mailDetails,(err,data)=>{
        if(err){
            console.log("Unable to send mail ",err);
        }
        else{
            console.log("Mail sent");
        }
    })
}

module.exports={sendEmail};