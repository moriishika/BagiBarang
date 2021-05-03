var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'moriishikaa@gmail.com',
    pass: 'MoriiLoveAimi1363'
  }
});

var mailOptions = {
  from: 'moriishikaa@gmail.com',
  to: 'ramanavami32@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});