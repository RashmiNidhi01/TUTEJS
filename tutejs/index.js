const multer = require("multer");
const upload = multer();
// Load packages and access services
const express = require("express");
const app = express();

// Setup view engine to ejs
app.set('view engine', 'ejs');

// Serve static content directly
app.use(express.static("css"));

// Setup routes

// Route to welcome page
app.get('/', (request, response) => {
    response.render("index");
});

// Start listening to incoming requests
// If process.env.PORT is not defined, port number 3000 is used
const listener = app.listen(process.env.PORT || 3007, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});
// Route to services page
app.get('/services', (request, response) => {
    //Data
    const name = "Amy";
    response.render("services", {name: name});
});
// Route to services page
app.get('/services', (request, response) => {
    //Data
    const name = "Amy";
    const data = {
        years: 5,
        services: [
            {
                name: "Consulting",
                desc: "State of the art consulting services"
            },
            {
                name: "Education",
                desc: "Educate your work force"
            },
            {
                name: "Security",
                desc: "Secure your network"
            }
        ]
    };
    response.render("services",
        {
            name: name,
            data: data
        });
}); 
//GET Route to form page
app.get('/formPost', (request, response) => {
    const message = "get";
    const data = {
        name: "",
        email: "",
        payment: ""
    };
    response.render("formPost", 
        {
            message: message,
            data: data
        });

});
// Add middleware to parse default urlencoded form
app.use(express.urlencoded({ extended: false }));
// Enable CORS (see https://enable-cors.org/server_expressjs.html)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
/// POST Route to form page
//app.post('/formPost', (request, response) => {
app.post('/formPost', upload.array(), (request, response) => {    
    const message = "post";
    // Send form data back to the form
    const data = {
        name: request.body.name,
        email: request.body.email,
        payment: request.body.payment
    }
    //Call formPost passing message and name
    response.render("formPost", 
        {
            message: message,
            data: data
        });
});
// GET Route to form page
app.get('/formAjax', (request, response) => {
    response.render("formAjax")
});

// POST Route to form page
app.post('/formAjax', upload.array(), (request, response) => {    
    // Send form data back to the form
    const data = {
        name: request.body.name,
        email: request.body.email,
        payment: request.body.payment
    };
    //Call formPost passing message and name
    response.json(data);
});