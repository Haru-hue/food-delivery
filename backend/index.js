const express = require('express');
const path = require('path')
const cors = require('cors');
const cookieParser = require("cookie-parser");
const connectToMongoose = require('./models/db')
// const sessions = require('express-session');
const routes = require('./routes/route');

const app = express()
const port = process.env.PORT || 5000 

connectToMongoose()
app.use(express.json())
// app.use(cookieParser());

app.use(cors());
 // Configure urlencoded middleware here
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.listen(port, () => {
    console.log('listening on port ' + port)
});
