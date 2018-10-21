'use strict';

const {WebhookClient} = require('dialogflow-fulfillment')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

let defaultHandler = require('./services/google/default_handler')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// use morgan
app.use(morgan('dev'))

function WebhookProcessing(req, res) {
    const agent = new WebhookClient({request: req, response: res});
    console.info(`agent set`)

    let intentMap = new Map()
    intentMap.set('Default Welcome Intent', defaultHandler.welcome);
    intentMap.set('Default Fallback Intent', defaultHandler.fallback);
// intentMap.set('<INTENT_NAME_HERE>', yourFunctionHandler);
    agent.handleRequest(intentMap)
}


// Webhook
app.post('/', function (req, res) {
    console.info(`\n\n>>>>>>> S E R V E R   H I T <<<<<<<`);
    WebhookProcessing(req, res)
});

app.listen(4000, function () {
    console.info(`Webhook listening on port 8080!`)
});