"use strict";

// import F1 from '../Services/Serach'
const handler = require('../services/google/default_handler');



const { dialogflow} = require("actions-on-google");

const google = {};
const app = dialogflow();


google.main = () => {
    app.intent('Default Welcome Intent',  handler.defaultHandler);
    return app;
};


module.exports = google;
