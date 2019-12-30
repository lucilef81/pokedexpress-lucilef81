const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5050

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('public'));

const session = require('express-session');
app.use(session({
  secret: 'a mighty secret',
  saveUninitialized: true,
  resave: true,
}));
app.use( (req, res, next) => {
  if(!req.session.team) {
    req.session.team = [];
  }
  next();
});

app.use(express.urlencoded({
  extended: true
}));

const router = require('./app/router');
app.use(router);

app.listen(PORT, (err, data) => {
console.log(`Listening on ${PORT}`);
});

