const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "studycase2021@gmail.com", // generated ethereal user
      pass: "2345qwerasdx", // generated ethereal password
    },
  });

  const sendEmail=async (from,to,subject,text) =>{
   
    let info = await transporter.sendMail({
        from, // sender address
        to, // list of receivers
        subject, // Subject line
        text// plain text body
        // html: "<b>Hello world?</b>", // html body
        
      });
      console.log("Message sent: %s", info.messageId);
  }






module.exports={transporter,sendEmail}


  