require('./models/db');

const express = require('express');
const path = require('path');
const exphdb = require('express-handlebars');
const helpers = require('handlebars-helpers')();
const bodyparser = require('body-parser'); 

const zawodnikController = require('./controllers/zawodnikController');

var app = express();
app.use(bodyparser.urlencoded( {
    extended: true
}));
app.use(bodyparser.json());

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphdb( {
    extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine', 'hbs');

app.listen(8080, () => {
    console.log('Start serwera na porcie 8080')
});

app.use('/zawodnik', zawodnikController)