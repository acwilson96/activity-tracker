const express = require('express')
const app     = express()

const PORT    = process.env.PORT || 5000

app.post('/url_visited', (req, res) => {
    console.log("Received Request");
    res.send('Visited URL: ' + req.data.url);
});

app.listen(PORT, () => console.log('Started acwilson96 analytics on port: ' + PORT));