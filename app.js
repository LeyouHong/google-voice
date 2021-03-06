'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const {dialogflow, Permission} = require('actions-on-google');
const sendText = require('./services/util/sendText')

let defaultHandler = require('./services/google/default_handler')


const server = express();
const assistant = dialogflow();
server.use(morgan('dev'))

server.set('port', process.env.PORT || 4000);
server.use(bodyParser.json({type: 'application/json'}));

assistant.intent('Default Welcome Intent', conv => {
    console.log("enter welcome")
	conv.ask('Hello, welcome to Leo voice text');
});

assistant.intent('Default Fallback Intent', conv => {
    console.log("enter fallback")
	conv.ask('Hello, welcome Leo fallback');
});

assistant.intent('SendTextIntent', conv => {
    let number = conv.parameters.number;
    console.log("enter text")
    //console.log(JSON.stringify(conv))
    let msg = conv.query
    console.log(msg)
    // Create publish parameters
    var params = {
        Message: msg,//`The number is ${number}`, /* required */
        PhoneNumber: '+19175611522',
    };

    sendText.text(params)
    conv.ask(`Hello Leo you should receive the text.`);
});

server.post('/', assistant);

server.listen(server.get('port'), function () {
	console.log('Express server started on port', server.get('port'));
});