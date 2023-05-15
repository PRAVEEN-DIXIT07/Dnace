require('dotenv').config();
const express = require("express"); // importing express module
const path = require("path");
const fs = require("fs");
var bodyparser = require("body-parser");

const app = express();// app of expr ess
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/contact-dance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

const port = process.env.PORT || 80;

// DEFINE MONGOOSE SCHEMA
var contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    email: String,
    phone: String,
    desc: String
});

var Contact = mongoose.model('Contact', contactSchema);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use('/static', express.static('static')); // for serving static  files
app.use(express.urlencoded());
app.set('view engine' , 'pug'); // set the template engine as pug
app.set('views' , path.join(__dirname,'views')); // set the view directory

app.get('/',(req,res)=>{
    const params = { }
    res.status(200).render('home.pug',params);
});

app.get('/contact',(req,res)=>{
    const params = { }
    res.status(200).render('contact.pug',params);
});

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database")
    }).catch(()=>{
        res.status(404).send("item was not save to the database")
    });
    //res.status(200).render('contact.pug');
});


app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`);
});
