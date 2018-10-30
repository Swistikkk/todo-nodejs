const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('*', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});

app.listen(port);