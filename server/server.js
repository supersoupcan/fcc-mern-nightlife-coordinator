const express = require('express');

const api = require('./routes/api');
const auth = require('./routes/auth');

const path = require('path');
const body = require('body-parser');
const session = require('express-session');

const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const configurePassport = require('./config/passport');

//CREATE//
var app = express();

//MIDDLEWARE//
mongoose.connect(process.env.MONGODB_URL, {
  useMongoClient: true
});

app.use(express.static(path.join(__dirname, '../client/static')));
app.use(body.json());
app.use(session({
  secret: 'out of the new session springs new life',
  store : new MongoStore({ 
    mongooseConnection: mongoose.connection,
  }),
  resave: true,
  saveUninitialized: true,
}));

//PASSPORT//
app.use(passport.initialize());
app.use(passport.session());
const newPassport = configurePassport(passport);

//ROUTES//
app.use('/auth', auth(newPassport));
app.use('/api', api);

//GLOBAL ROUTE SINGLE PAGE APPLICATION
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
});

//SERVE API//
module.exports = app;