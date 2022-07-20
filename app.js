const express = require('express')
const path= require('path');
const app = express();
const port = 80;

// Express related Stuffs
app.use('/static', express.static('static'));
app.use(express.urlencoded());

// Pug Specific Engine work
app.set('view engine', 'pug'); // For rendering the template engine and to serve static files on the browser etc.
app.set('views', path.join(__dirname, 'views'));


// Express related APIs
app.get('/', (req,res)=>{
    res.render('home.pug');
})
app.get('/contact', (req,res)=>{
    res.render('contact.pug');
})
app.post('/contact', (req,res)=>{
    console.log(req.body);
})

// Port to Listen the request and serve to the client browser.
app.listen(port, ()=>{
    console.log("Server started successfully on the port 80 and the presentation is ready to shown on the Browser.");
})