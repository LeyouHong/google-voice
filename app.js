'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const {dialogflow} = require('actions-on-google');

let defaultHandler = require('./services/google/default_handler')


const server = express();
const assistant = dialogflow();
server.use(morgan('dev'))

server.set('port', process.env.PORT || 4000);
server.use(bodyParser.json({type: 'application/json'}));

assistant.intent('SendNotificationIntent', conv => {
    console.log("enter SendNotificationIntent")
    let name = conv.parameters.name;
	conv.ask('Hello, welcome ' + name);
});

server.post('/google', assistant);

server.listen(server.get('port'), function () {
	console.log('Express server started on port', server.get('port'));
});