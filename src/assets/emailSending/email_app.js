const express  = require('express');
const app      = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('SecuredKey@123');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

const port     = process.env.PORT || 8081;

app.post('/sendEmail',function(req,res){
    let message = req.body.data;
    let name = message['name'];
    let email = message['email'];
    let contact = message['mobile'];

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hameedirfan18@gmail.com',//// need to change client email
        pass: cryptr.decrypt('6218f187cb8732bee35e11234a36310bdc7c0b349e576669c49a')// need to change client password
    }
});

var mailOptions = {
    from: 'Darshini Astrology<hameedirfan18@gmail.com>',// need to change client email
    to: "hameedirfan13@gmail.com",//// need to change client email
    subject: "New Astro Request",
    html :`
    
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style type="text/css">
.form-style-5{
	max-width: 500px;
	padding: 10px 20px;
	background: #f4f7f8;
	margin: 10px auto;
	padding: 20px;
	background: #f4f7f8;
	border-radius: 8px;
	font-family: Georgia, "Times New Roman", Times, serif;
}
.form-style-5 fieldset{
	border: none;
}
.form-style-5 legend {
	font-size: 1.4em;
	margin-bottom: 10px;
}
.form-style-5 label {
	display: block;
	margin-bottom: 8px;
}
.form-style-5 input,
.form-style-5 textarea,
.form-style-5 select {
	font-family: Georgia, "Times New Roman", Times, serif;
	background: rgba(255,255,255,.1);
	border: none;
	border-radius: 4px;
	font-size: 15px;
	margin: 0;
	outline: 0;
	padding: 10px;
	width: 100%;
	box-sizing: border-box; 
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box; 
	background-color: #e8eeef;
	color:#8a97a0;
	-webkit-box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
	box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
	margin-bottom: 30px;
}
.form-style-5 input:focus,
.form-style-5 textarea:focus,
.form-style-5 select:focus{
	background: #d2d9dd;
}
.form-style-5 select{
	-webkit-appearance: menulist-button;
	height:35px;
}
.form-style-5 .number {
	background: #1abc9c;
	color: #fff;
	height: 30px;
	width: 30px;
	display: inline-block;
	font-size: 0.8em;
	margin-right: 4px;
	line-height: 30px;
	text-align: center;
	text-shadow: 0 1px 0 rgba(255,255,255,0.2);
	border-radius: 15px 15px 15px 0px;
}

</style>
</head>
<body>

<div class="form-style-5">
<form>
<fieldset>
<legend><span class="number">1</span>Basic Info</legend>
<label>Name</label>
<input type="text" name="Name" value="${name}" disabled>
<label>Email</label>
<input type="email" name="Email" value="${email}" disabled>
<label>Contact</label>
<input typr="number" name="Contact_no" value="${contact}" disabled>
</fieldset>
<fieldset>
<legend><span class="number">2</span> Additional Info</legend>
<textarea name="field3" disabled>OtherDetails</textarea>
</fieldset>
</form>
</div>

</body>
</html>

    `
        
};

transporter.sendMail(mailOptions, function(error){
    if (error) {
        console.log(error);
        res.json({
            "Status":"Error",
            "Message": "Email Sent Failed"
        })
    } else {
        res.json({
            "Status":"OK",
            "Message": "Email sent Successfully"
        })
        console.log('Email sent Successfully.');
    }
});

});


// launch ======================================================================
app.listen(port);
console.log('The Server Running in  ' + port);