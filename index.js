const express   = require('express')
const path      = require('path')
const app       = express()
const PORT      = process.env.PORT || 5000

const nodemailer    = require('nodemailer');

const logging_email = process.env.LOG_EMAIL;
const email         = process.env.EMAIL;
const password      = process.env.PASSWORD;

console.log("Logging From:");
console.log(email);
console.log("To:");
console.log(logging_email);

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password
    }
});

/* Fires the configured email. */
function sendNotif(email) {
    transporter.sendMail(email, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent:');
          console.log(email);
          console.log('Response: ' + info.response);
        }
    });
}

const Action  = require('./models/action.js');
 
app.enable('trust proxy');

app.get('/test_endpoint', (req, res) => {
    console.log("Received Request on /test_endpoint");
    res.send('Result from GET to /test_endpoint');
});

app.get('/visit_url', (req, res) => {
    // Store Action
    let newAction = {
        action: "URL Visit",
        timestamp: Math.round(+new Date()/1000),
        ip: req.ip,
        target_url: req.query.target,
        referrer_url: 'N/A'
    }

    console.log(newAction);
    sendNotif({
        from: email,
        to: logging_email,
        subject: "URL Visited",
        text: JSON.stringify(newAction)
    });

    // Send Response
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ success: 1 }));
})

app.get('/click_url', (req, res) => {
     // Store Action
     let newAction = {
        action: "URL Click",
        timestamp: Math.round(+new Date()/1000),
        ip: req.ip,
        target_url: req.query.target,
        referrer_url: req.query.referrer
    }
    
    console.log(newAction);
    sendNotif({
        from: email,
        to: logging_email,
        subject: "URL Clicked",
        text: JSON.stringify(newAction)
    });

    // Send Response
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ success: 1 }));
});

app.listen(PORT, () => console.log('Started acwilson96 analytics on port: ' + PORT + "\n"));