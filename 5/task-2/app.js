const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const handleOperations = require('./src/handler.js');

app.set('views', __dirname + '/views'); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/submit/operations', (req, res) => {
    let operations = JSON.parse(req.body.data);
    let response = handleOperations(operations);
    res.status(200).send(response);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
