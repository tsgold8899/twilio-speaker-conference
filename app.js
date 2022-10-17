const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const models = require('./models');

const app = express();

// setupPassport(app);

app.use(express.static(path.join(__dirname, 'node_modules')));
app.set('trust proxy', true);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (request, response) => {
  response.render('index', {
    subject: 'Pug template engine',
    name: 'our template',
    link: 'https://google.com'
  });
});

const httpServer = http.createServer(app);
httpServer.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log('Press CTRL-C to stop\n');
});
