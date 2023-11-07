const express = require('express');
const paths = require('path'); 
const nodemailer = require("nodemailer");
const handlebars = require('express-handlebars');
const { exit } = require('process');
const routes = require('./routes/jsonRoutes/json_processor');
const app = express();
require("dotenv").config();

const hostname = '127.0.0.1';
const port = 8080;

//Static Folder


app.use(express.static('public'));

//View engine setup
app.set("view engine", 'handlebars');
app.engine('handlebars', handlebars.engine({
    layoutsDir: __dirname + '/views/layouts/',
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: __dirname + '/views/partials/'
}));


app.use(express.urlencoded({extended: false}));
app.use(express.json())
    

console.log('******************'+paths.join(__dirname, 'public')+'******************')


app.use('/', routes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
