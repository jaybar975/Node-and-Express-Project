/** BASIC EXPRESS SETUP
* server.js
* 1. Require Express
* 2. Create a variable to use express
* 3. Allow the use of static assets
*    - examples: css, .js (client-side)
* 4. Require the request library 
*/
const express = require("express");
const app = express();
app.use(express.static("public"));
var request = require("request");


/** COMPRESSION
* 1. Provides gzip compression for the HTTP response
* 2. Enable gzip compression for all HTTP responses
*/
var compression = require('compression'); 
app.use(compression());


/**
* http://expressjs.com/en/starter/basic-routing.html
* @example
  app.get("/", function(request, response) {
    response.sendFile(__dirname + "/views/index.html");
  });
*/



/** TEMPLATE ENGINE
* Express Handlebars is setup here
* 1. Require [jsesc](https://github.com/mathiasbynens/jsesc)
     - This is used in the [helper](https://handlebarsjs.com/block_helpers.html)
     - [liberary of helper function](https://github.com/helpers/handlebars-helpers)
* 2. Define the template engine (hbs aka handlebars)
     - The default layout is the main.hbs file
  3. Set the "view" / "template" engine
    - [app.engine](https://expressjs.com/en/api.html#app.engine)
    - [app.set](https://expressjs.com/en/api.html#app.set)
*/
const hbs = require('express-handlebars')({
  defaultLayout: 'main',
  extname: '.hbs'
});
app.engine('hbs', hbs);
app.set('view engine', 'hbs');

/**
* You can also refactor your routes like this later
* @example  
  const routes = require("./routes");
  app.use("/api", routes);
*/


/**
* Mock Data
*/




/** PAGES / VIEWS / ROUTES
* Your pages or routes go here
* 1. Route for your home page
* 2. Route for your about page
* 3. Route for any undefined page will send a 404 error.
* 4. Handle errors
*/
app.get("/", (request, response) => {
  response.render('index', {
    exampleVariable: "Hello world"
  });
});
app.get("/about", (request, response) => {
  response.render('about');
});
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})


/**
* And we end with some more generic node stuff -- listening for requests :-)
* console.log(process.env);
*/
let listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
