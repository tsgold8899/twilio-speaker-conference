const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
var session = require('express-session');

dotenv.config();

const models = require('./models');
const setupPassport = require('./middlewares/passport');
const routes = require('./routes');

const app = express();

setupPassport(app);

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));
app.set('trust proxy', true);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

const httpServer = http.createServer(app);
httpServer.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log('Press CTRL-C to stop\n');
});
