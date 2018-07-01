const express = require('express')
const app     = express()

app.post('/url_visited', (req, res) => {
    console.log("Received Request");
    res.send('Visited URL: ' + req.data.url);
});

app.listen(3000, () => console.log('Started acwilson96 analytics on port 3000!'));