const express = require('express');
const path = require('path')
const cors = require('cors');
const cookieParser = require("cookie-parser");
const connectToMongoose = require('./models/db')
const session = require('express-session');
const routes = require('./routes/route');

const app = express()
const port = process.env.PORT || 5000 

connectToMongoose()
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  }));
  
app.use(cookieParser());

 // Configure urlencoded middleware here
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true
    }
  }));

app.use('/', routes);

app.listen(port, () => {
    console.log('listening on port ' + port)
});
