const express = require('express')
const app = express()
const port = process.env.PORT || 80
fs = require('fs')

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({extended: false})

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/Lab3.html")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/saveData', urlencodedParser, (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    const content = "numberOfTubs=" + req.body.numberOfTubs
        + ";tubsNamesArray=" + req.body.tubsNamesArray + ";"
        + ";tubsTextArray=" + req.body.tubsTextArray + ";"
        + ";tubsHtml=" + req.body.tubsHtml + ";"
    ;

    fs.writeFile('data.txt', content, function (err) {
        if (err) return console.log(err);
        console.log("File saved successfully");

    });
});

app.get('/getData', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    fs.readFile("data.txt", 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        res.send(data);
    });
});

app.use(express.static(__dirname));
