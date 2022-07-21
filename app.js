const express = require('express')
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const port = 80;
const bodyparser= require('body-parser');

// Express related Stuffs
app.use('/static', express.static('static'));
app.use(express.urlencoded());

// Pug Specific Engine work
app.set('view engine', 'pug'); // For rendering the template engine and to serve static files on the browser etc.
app.set('views', path.join(__dirname, 'views'));


// mongoose related Stuffs

mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true }, () => {
    console.log("database created successfully and the data is ready to write in the database etc.")
});

// mongoose Schema is defined for further use in the mongodb.
let contactSchema = new mongoose.Schema({
    Name: String,
    phone: String,
    Email: String,
    address: String,
    Desc: String
});

let contactModel = mongoose.model('contactdanceCollectionInformation', contactSchema);


// Express related APIs
app.get('/', (req, res) => {
    res.render('home.pug');
})
app.get('/contact', (req, res) => {
    res.render('contact.pug');
})
app.post('/contact', (req, res) => {
    let mydata= new contactModel(req.body);
    mydata.save().then(()=>{
        res.send("This item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Item was not save to the database. Please Try Again Later !!!!!!")
    })

    // res.render('contact.pug');
})

// Port to Listen the request and serve to the client browser.
app.listen(port, () => {
    console.log("Server started successfully on the port 80 and the presentation is ready to shown on the Browser.");
})