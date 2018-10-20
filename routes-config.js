"use strict";

const home = require("./lib/home.js");
const google = require("./lib/google.js");

exports.configureRoutes = (app) => {
    app.get("/", home.welcome());
    app.use("/google", google.main());
};
