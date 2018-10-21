'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const {dialogflow, Permission} = require('actions-on-google');

let defaultHandler = require('./services/google/default_handler')


const server = express();
const assistant = dialogflow();
server.use(morgan('dev'))

server.set('port', process.env.PORT || 4000);
server.use(bodyParser.json({type: 'application/json'}));

assistant.intent('Default Welcome Intent', conv => {
    console.log("enter welcome")
	conv.ask('Hello, welcome Leo welcome');
});

assistant.intent('Default Fallback Intent', conv => {
    console.log("enter fallback")
	conv.ask('Hello, welcome Leo fallback');
});

assistant.intent('SendNotificationIntent', conv => {
    console.log("enter notification")
    conv.ask('Hello, welcome Leo SendNotificationIntent');
});

server.post('/', assistant);

server.listen(server.get('port'), function () {
	console.log('Express server started on port', server.get('port'));
});