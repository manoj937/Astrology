const express = require('express');
const app = express();

const port = process.env.PORT || 49154;

app.get('/test', function (req, res) {
    var redirectUrl = 'https://www.instamojo.com/@predicthoroscope/d49bfdfdeeb641c1aaccf6d199bc7638';
    res.status(200).redirect(redirectUrl)
});


// launch ======================================================================
app.listen(port);
console.log('The Server Running in  ' + port);
