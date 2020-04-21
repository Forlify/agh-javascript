

const app = express();

const express = require('express');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(function (err, req, res, next) {
    res.status(500).send('500 - Something was error!');
});

app.get('path', (req, res) => {

});


app.listen(port, () => {
    console.log('Example app listening on port port!');
});

