const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

dotenv.config();

const models = require('./models');
const setupPassport = require('./middlewares/passport');
const routes = require('./routes');

const app = express();

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: false }
}));

app.set('trust proxy', true);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cookieParser(process.env.SECRET_KEY));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));

setupPassport(app);

app.use('/', routes);

const httpServer = http.createServer(app);
httpServer.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log('Press CTRL-C to stop\n');
});
