require('dotenv').config()
const express = require('express')
const bodyParser= require('body-parser')
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
    "758541214200-6cflh3bf8aqomqr332qvv4fcriapppo4.apps.googleusercontent.com",
    "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",
    "https://developers.google.com/oauthplayground"
    )

oauth2Client.setCredentials({
    refresh_token:"1//04QsHIKnN49jyCgYIARAAGAQSNwF-L9IrQuPYuIb2dRdp8AN1zqR7wRTr_puvX9MDia5ir71yUt3lryzvr9oRYXUXYMqQN0l6Eao"
})
const accessToken = oauth2Client.getAccessToken()

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.route("/").get(function (req, res) {
    res.sendFile(process.cwd() + "/views/index.html");
  });
app.use(express.static('views'))
app.post('/email',(req,response)=>{
const output=`
  <p>You have a new contact request</p>
  <img class="email" src="cid:email" alt="email-image">
  <h3>Contact details</h3>
  <ul>
  <li>FirstName: ${req.body.name}</li>
  <li>Subject: ${req.body.subject}</li>
  <li>Email: ${req.body.email}</li>
  <li>Message: ${req.body.message}</li>
  </ul>`
const smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
  auth:{
  type:"OAuth2",
  user:"rarafat883@gmail.com",
  clientId:"758541214200-6cflh3bf8aqomqr332qvv4fcriapppo4.apps.googleusercontent.com",
  clientSecret:"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",
  refreshToken:"1//04QsHIKnN49jyCgYIARAAGAQSNwF-L9IrQuPYuIb2dRdp8AN1zqR7wRTr_puvX9MDia5ir71yUt3lryzvr9oRYXUXYMqQN0l6Eao",
  accessToken:accessToken
  }})
const mailOpts = {
  from:"rarafat883@gmail.com",
  to:"rarafat15@yahoo.com"
  subject:'New message from Nodemailer-contact-form',
  html:output
}
smtpTrans.sendMail(mailOpts,(error,res)=>{
   if(error){
   console.log(error);
   }
   else{
    console.log("Message sent: " + res.message);
    response.status(200).send(200)
    }
  //smtpTrans.close();
   })
})
const port = process.env.PORT || 5000
const server = app.listen(port,listening)
function listening (){
  console.log(`server running on ${port}`)
}
