const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "951939049078-qgemq3i729uqv6a1qs26rihtngvnle9e.apps.googleusercontent.com",
  "Tx1lZFsnnHHVp1UHtzITJJiD", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: "1//047kGAu9XplaCCgYIARAAGAQSNwF-L9IrncHwJ0Lg7LZOiVjSEvPccLHibQI1YphO_1p9GYndjE3rAoSXzEcszeT1SSmk9mwdDAo"
});

const accessToken = oauth2Client.getAccessToken();

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
       type: "OAuth2",
       user: "bagibarang@gmail.com", 
       clientId: "951939049078-qgemq3i729uqv6a1qs26rihtngvnle9e.apps.googleusercontent.com",
       clientSecret: "Tx1lZFsnnHHVp1UHtzITJJiD",
       refreshToken: "1//047kGAu9XplaCCgYIARAAGAQSNwF-L9IrncHwJ0Lg7LZOiVjSEvPccLHibQI1YphO_1p9GYndjE3rAoSXzEcszeT1SSmk9mwdDAo",
       accessToken: accessToken
  },
  tls: {
    rejectUnauthorized: true  
  }
});

const mailOptions = {
  from: "bagibarang9@gmail.com",
  to: "ramanavami32@gmail.com",
  subject: "AGUNG BENDERMAN",
  generateTextFromHTML: true,
  html: `<h1>Njir Enderman</h1> <img src="https://i.imgflip.com/47g6dx.png">`
};

smtpTransport.sendMail(mailOptions, (error, response) => {
  error ? console.log(error) : console.log(response);
  smtpTransport.close();
});