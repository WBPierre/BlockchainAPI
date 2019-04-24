const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


const hostname = "127.0.0.1";
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;


var mongodb = 'mongodb://localhost/Coursnodedb';
mongoose.connect(mongodb, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const blockRoutes = require('./routes/blockRoutes');
const userRoutes = require('./routes/userRoutes');

blockRoutes(app);
userRoutes(app);


app.listen(port, hostname);