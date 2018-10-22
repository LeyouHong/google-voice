// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set region
AWS.config.update({region: 'REGION'});

exports.text = (params) => {
    var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
    // Handle promise's fulfilled/rejected states
    publishTextPromise.then((data) => {
        console.log("MessageID is " + data.MessageId);
    }).catch((err) => {
        console.error(err, err.stack);
    });
}
