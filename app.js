"use strict";

const express = require("express");
const bodyParser = require("body-parser")
const routes = require("./routes-config");
var morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
// body parser for POST JSON data

// handle invalid/404 routes
app.use((req, res, next) => {
    console.log(JSON.stringify(req.body));
   // res.status(404).send({ message: "request not found" });
    next();
})
// routes config
routes.configureRoutes(app);

// use morgan
app.use(morgan('dev'))

// Set Http server.
// set default PORT to 4000 if environment variable is not available
const PORT_HTTP = process.env.PORT || 4000;
app.listen(PORT_HTTP, () => console.log(`listening on port ${PORT_HTTP}`));
