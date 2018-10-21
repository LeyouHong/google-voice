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

assistant.intent('SendNotificationIntent', conv => {
    console.log("enter SendNotificationIntent")
    return conv.ask(new Permission({
        context: 'Welcome to Seven Voice store . '
        , permissions: ['NAME', 'DEVICE_PRECISE_LOCATION'],
    }));
});

server.post('/google', assistant);

server.listen(server.get('port'), function () {
	console.log('Express server started on port', server.get('port'));
});