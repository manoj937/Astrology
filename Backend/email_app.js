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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
  next();
})

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
  let request_type = req.query.type;
  Insta.setKeys('12b5747f2dd34ba392d77e83bed87328', '9124912abddb41180b8ec7917174301c');
  let user_id = '';

  const data = new Insta.PaymentData();

  Promise.using(db(), function (connection) {
    let lastIdQuery = '';
    let insertQuery = '';
    if (request_type === '1') {
      lastIdQuery = `select id from userDetails order by id desc limit 1`;
      insertQuery = `INSERT INTO userDetails (name, gender, dob, birthplace, birthstar, birthtime, mobile, email, rashi, maritialstatus, otherques, createdon) 
						   VALUES ('${req.body.userData.name}','${req.body.userData.gender}','${req.body.userData.birthDay}','${req.body.userData.birthPlace}','${req.body.userData.birthStar}',
							'${req.body.userData.birthTime}','${req.body.userData.mobile}','${req.body.userData.emailAddress}','${req.body.userData.rashi}','${req.body.userData.maritialStatus}','${req.body.userData.questions}'
              ,'${Date.now()}')`;
    } else if (request_type === '2') {
      lastIdQuery = `select id from marriage_match order by id desc limit 1`;
      insertQuery = `INSERT INTO marriage_match (m_name, m_dob, m_time, m_birth_place, m_birth_star, m_rashi, f_name, f_dob, f_time, f_birth_place, f_birth_star, f_rashi, email, mobile, createdon) 
      VALUES ('${req.body.userData.bname}','${req.body.userData.bbirthDay}','${req.body.userData.bbirthTime}','${req.body.userData.bbirthPlace}','${req.body.userData.bbirthStar}',
              '${req.body.userData.brashi}','${req.body.userData.gname}','${req.body.userData.gbirthDay}','${req.body.userData.gbirthTime}','${req.body.userData.gbirthPlace}',
              '${req.body.userData.gbirthStar}','${req.body.userData.grashi}','${req.body.userData.emailAddress}','${req.body.userData.mobile}','${Date.now()}');`;
    }
    connection.query(insertQuery).then((insertResp) => {
      connection.query(lastIdQuery).then((resp) => {
        user_id = resp[0]['id'];
        data.purpose = req.body.purpose;
        data.amount = req.body.amount;
        data.buyer_name = req.body.buyer_name;
        data.redirect_url = `${req.body.redirect_url}?user_id=${user_id}`;
        data.email = req.body.email;
        data.phone = req.body.phone;
        data.send_email = true;
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

    if (payment_status === 'Credit') {
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
    } else {
      console.log("Payment Failed");
      return res.redirect("https://predicthoroscope.com/failure");
    }

  }
})

app.get('/marriage_match_callback', function (req, res) {
  let url_parts = url.parse(req.url, true);

  responseData = url_parts.query;

  if (responseData.payment_id) {
    let payment_id = responseData.payment_id;
    let payment_status = responseData.payment_status;
    let user_id = responseData.user_id;

    if (payment_status === 'Credit') {
      Promise.using(db(), function (connection) {
        let userDataQuery = `select * from marriage_match where id = ${user_id}`;
        connection.query(userDataQuery).then((selectedData) => {
          emailSending(selectedData[0], 3).then(() => {
            emailSending(selectedData[0], 2).then(() => {
              return res.redirect("https://predicthoroscope.com/success");
            }).catch(err => {
              console.log("marriage_match_callback errorrr....", err);
              return res.redirect("https://predicthoroscope.com/failure");
            })
          })
        }).catch(err => {
          console.log("marriage_match_callback error....", err)
        })
      });
    } else {
      console.log("marriage_match_callback Payment Failed");
      return res.redirect("https://predicthoroscope.com/failure");
    }

  }
})

function emailSending(message, emailDecider) {
  return new Promise(function (resolve, reject) {
    let name;
    let gender;
    let birthday;
    let birthTime;
    let birthPlace;
    let birthStar;
    let emailAddress;
    let mobile;
    let rashi;
    let maritialStatus;
    let questions;

    let bride_name;
    let bride_birthPlace;
    let bride_birthTime;
    let bride_birthday;
    let bride_birthStar;
    let bride_rashi;

    let groom_name;
    let groom_birthPlace;
    let groom_birthTime;
    let groom_birthday;
    let groom_birthStar;
    let groom_rashi;

    if (emailDecider === 1) {
      name = message['name'];
      gender = message['gender'];
      birthday = message['dob'];
      birthTime = message['birthtime'];
      birthPlace = message['birthplace'];
      birthStar = message['birthstar'];
      emailAddress = message['email'];
      mobile = message['mobile'];
      rashi = message['rashi'];
      maritialStatus = message['maritialstatus'];
      questions = message['otherques'];
    } else if (emailDecider === 3) {
      bride_name = message['f_name'];
      bride_birthPlace = message['f_birth_place'];
      bride_birthTime = message['f_time'];
      bride_birthday = message['f_dob'];
      bride_birthStar = message['f_birth_star'];
      bride_rashi = message['f_rashi'];

      groom_name = message['m_name'];
      groom_birthPlace = message['m_birth_place'];
      groom_birthTime = message['m_time'];
      groom_birthday = message['m_dob'];
      groom_birthStar = message['m_birth_star'];
      groom_rashi = message['m_rashi'];
    }

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
    } else if (emailDecider === 3) {
      var mailOptions = {
        from: 'Darshini Astrology<info@predicthoroscope.com>', // need to change client email
        to: "predicthoroscope@gmail.com", //// need to change client email
        subject: "New Marriage Matching Request",
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
		<legend><span class="number">1</span>Bride Info</legend>
		<label>Name</label>
    <input type="text" value="${bride_name}" disabled>
    <label>Birth Place</label>
    <input type="text" value="${bride_birthPlace}" disabled>
    <label>Birth Time</label>
		<input type="text" value="${bride_birthTime}" disabled>
		<label>Birth Day</label>
    <input type="text" value="${bride_birthday}" disabled>
    <label>Birth Star</label>
		<input type="text" value="${bride_birthStar}" disabled>
		<label>Rashi</label>
		<input type="text" value="${bride_rashi}" disabled>
    </fieldset>
		<fieldset>
		<legend><span class="number">2</span> Groom Info</legend>
		<label>Name</label>
    <input type="text" value="${groom_name}" disabled>
    <label>Birth Place</label>
    <input type="text" value="${groom_birthPlace}" disabled>
    <label>Birth Time</label>
		<input type="text" value="${groom_birthTime}" disabled>
		<label>Birth Day</label>
    <input type="text" value="${groom_birthday}" disabled>
    <label>Birth Star</label>
		<input type="text" value="${groom_birthStar}" disabled>
		<label>Rashi</label>
		<input type="text" value="${groom_rashi}" disabled>
    </fieldset>
    <fieldset>
    <legend><span class="number">3</span> General Info</legend>
    <label>Email</label>
		<input type="email" name="Email" value="${emailAddress}" disabled>
		<label>Contact</label>
		<input typr="number" name="Contact_no" value="${mobile}" disabled>
    </fieldset>
		</form>
		</div>
		
		</body>
		</html>
		
			`

      };
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
