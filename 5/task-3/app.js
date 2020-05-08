const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const getData = require('./src/getDataHandler.js');

const url = "https://api.nbp.pl/api/exchangerates/rates/A";
const format = "?format=json"

app.set('views', __dirname + '/views'); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/average/:date1/:date2/*', async function (req, res) {      // The first route
    let { date1, date2 } = req.params;
    let currencies = req.params[0].split('/');

    let result = [];
    for (currency of currencies) {
        let days = await getData(`${url}/${currency}/${date1}/${date2}/${format}`);

        let sum = 0;
        let count = days.rates.length;

        for (day of days.rates) sum += day.mid;
        
        result.push({ currency, mean: (sum / count).toFixed(4) });
    }
    res.render('index', { result });
});


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

