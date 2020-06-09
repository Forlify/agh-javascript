const path = require('path');
const http = require('http');
const express = require('express');
const app = express();

app.use(express.static('.'));

app.get('/:area/:location', (req, res) => {
  try {
    const apiUrl = 'http://worldtimeapi.org/api/timezone';
    const { area, location } = req.params;

    http.get(`${apiUrl}/${area}/${location}`, (response) => {
      response.setEncoding('utf8');
      let body = '';

      response
        .on('data', (chunk) => {
          body += chunk;
        })
        .on('end', () => {
          body = JSON.parse(body);

          const { datetime, timezone } = body;
          res.status(400).send({ datetime, timezone });
        });
    });
  } catch(e) {
    res.status(400);
  }
});

app.listen(8080, () => {
  console.log(`App is listening at port 8080`);
});
