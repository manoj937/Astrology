const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('SecuredKey@123');
const cors = require('cors');
const Insta = require('instamojo-nodejs');
const url = require('url');
var db = require('./mysql_conn');
var Promise = require("bluebird");

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const port = process.env.PORT || 49153;



app.get('/test', function (req, res) {
  res.json({
    "status": "OK"
  })
});


app.post('/pay', function (req, res) {
  Insta.setKeys('12b5747f2dd34ba392d77e83bed87328', '9124912abddb41180b8ec7917174301c');
  let user_id = '';

  const data = new Insta.PaymentData();

  Promise.using(db(), function (connection) {
    let lastIdQuery = `select id from userDetails order by id desc limit 1`;
    let insertQuery = `INSERT INTO userDetails (name, gender, dob, birthplace, birthstar, birthtime, mobile, email, rashi, maritialstatus, otherques, createdon) 
						   VALUES ('${req.body.userData.name}','${req.body.userData.gender}','${req.body.userData.birthDay}','${req.body.userData.birthPlace}','${req.body.userData.birthStar}',
							'${req.body.userData.birthTime}','${req.body.userData.mobile}','${req.body.userData.emailAddress}','${req.body.userData.rashi}','${req.body.userData.maritialStatus}','${req.body.userData.questions}'
							,'${Date.now()}')`;
    connection.query(insertQuery).then((insertResp) => {
      connection.query(lastIdQuery).then((resp) => {
        user_id = resp[0]['id'];
        data.purpose = req.body.purpose;
        data.amount = req.body.amount;
        data.buyer_name = req.body.buyer_name;
        data.redirect_url = `${req.body.redirect_url}?user_id=${user_id}`;
        data.email = req.body.email;
        data.phone = req.body.phone;
        data.send_mail = false;
        data.webhook = 'http://www.example.com/webhook';
        data.send_sms = false;
        data.allow_repeated_payments = false;

        Insta.createPayment(data, function (error, response) {
          if (error) {
            // some error
          } else {
            // Payment redirection link at response.payment_request.longurl
            console.log(response);
            const responseData = JSON.parse(response);
            const redirectUrl = responseData.payment_request.longurl;

            res.status(200).json(redirectUrl)
          }
        });
      }).catch(err => {
        console.log("Query Error", err)
      })
    }).catch(err => {
      console.log("Connection Error", err)
    })
  }).catch(err => {
    console.log("Connection Error 1", err)
  })


})

app.get('/callback', function (req, res) {
  let url_parts = url.parse(req.url, true);

  responseData = url_parts.query;

  if (responseData.payment_id) {
    let payment_id = responseData.payment_id;
    let payment_status = responseData.payment_status;
    let user_id = responseData.user_id;

    Promise.using(db(), function (connection) {
      let userDataQuery = `select * from userDetails where id = ${user_id}`;
      connection.query(userDataQuery).then((selectedData) => {
        emailSending(selectedData[0], 1).then(() => {
          emailSending(selectedData[0], 2).then(() => {
            return res.redirect("https://predicthoroscope.com/success");
          }).catch(err => {
            console.log("errorrr....", err);
            return res.redirect("https://predicthoroscope.com/failure");
          })
        })
      }).catch(err => {
        console.log("call back error....", err)
      })
    });

  }
})

function emailSending(message, emailDecider) {
  return new Promise(function (resolve, reject) {
    let name = message['name'];
    let gender = message['gender'];
    let birthday = message['dob'];
    let birthTime = message['birthtime'];
    let birthPlace = message['birthplace'];
    let birthStar = message['birthstar'];
    let emailAddress = message['email'];
    let mobile = message['mobile'];
    let rashi = message['rashi'];
    let maritialStatus = message['maritialstatus'];
    let questions = message['otherques'];

    const transporter = nodemailer.createTransport({
      host: 'server190.iseencloud.com',
      port: 465,
      secure: true,
      auth: {
        user: 'info@predicthoroscope.com', //// need to change client email
        pass: cryptr.decrypt('f2d50800a6ddf3b2e1121273f830dac5eccd6908540974acced138fc31') // need to change client password
      }
    });
    if (emailDecider === 1) {
      var mailOptions = {
        from: 'Darshini Astrology<info@predicthoroscope.com>', // need to change client email
        to: "predicthoroscope@gmail.com", //// need to change client email
        subject: "New Astro Request",
        html: `
			
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
		<input type="text" value="${name}" disabled>
		<label>Email</label>
		<input type="email" name="Email" value="${emailAddress}" disabled>
		<label>Contact</label>
		<input typr="number" name="Contact_no" value="${mobile}" disabled>
		<label>Gender</label>
		<input type="text" value="${gender}" disabled>
		</fieldset>
		<fieldset>
		<legend><span class="number">2</span> Additional Info</legend>
		<label>Birth Place</label>
		<input type="text" value="${birthPlace}" disabled>
		<label>Birth Time</label>
		<input type="text" value="${birthTime}" disabled>
		<label>Birth Day</label>
		<input type="text" value="${birthday}" disabled>
		<label>Birth Star</label>
		<input type="text" value="${birthStar}" disabled>
		<label>Rashi</label>
		<input type="text" value="${rashi}" disabled>
		<label>Maritial Status</label>
		<input type="text" value="${maritialStatus}" disabled>
		<label>Other Questions</label>
		<textarea disabled>${questions}</textarea>
		</fieldset>
		</form>
		</div>
		
		</body>
		</html>
		
			`

      };
    } else if (emailDecider === 2) {
      var mailOptions = {
        from: 'Darshini Astrology<info@predicthoroscope.com>', // need to change client email
        to: emailAddress, //// need to change client email
        subject: "Payment Confirmation",
        text: `Dear Sir / Madam,
						Your payment has been succesfully done.We will share your horoscope detail shortly.


					With Regards,
					Darshini Astrology`
      }
    }


    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        console.log(error);
        reject();
        console.log('Email not sent.');
      } else {
        resolve();
        console.log('Email sent Successfully.');
      }
    });
  })
}

// launch ======================================================================
app.listen(port);
console.log('The Server Running in  ' + port);
