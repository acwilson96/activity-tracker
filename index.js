const express   = require('express')
const path      = require('path')
const app       = express()
const PORT      = process.env.PORT || 5000

app().use(express.static(path.join(__dirname, 'public')))

app.get('/test_endpoint', (req, res) => {
    console.log("Received Request on /test_endpoint");
    res.send('Result from GET to /test_endpoint');
});

app.listen(PORT, () => console.log('Started acwilson96 analytics on port: ' + PORT));