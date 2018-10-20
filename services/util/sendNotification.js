const aws = require('aws-sdk');

const sendNotificationToStore = function(payload){
    let pushService =  new aws.Lambda({ region: process.env.REGION });
    return new Promise(function (resolve, reject) {
        pushService.invoke({
            FunctionName: process.env.SNS_PUSH_TO_STORE+'', //eslint-disable-line
            Payload: JSON.stringify({ body: payload }),
            InvocationType: 'Event'
        }, function (error, data) {
            if (error) {
                return reject(error);
            }
            resolve(null, data);
        });
    });
};

const sendNotificationToDevice = function(payload){

    aws.config.update({ 
        "accessKeyId": "AWSAccessKeyId", 
        "secretAccessKey": "AWSAccessKeySecret", 
        "region": 'us-west-2',
      });
    let pushDeviceService =  new aws.Lambda({'region': 'us-east-1'});
    return new Promise(function (resolve, reject) {
        pushDeviceService.invoke({
            //FunctionName: process.env.SNS_PUSH_TO_DEVICE+'', //eslint-disable-line
            FunctionName: "notifications-qa-sendNotificationToUser",
            Payload: JSON.stringify({ body: payload }),
            InvocationType: 'Event'
        }, function (error, data) {
            if (error) {
                return reject(error);
            }
            resolve(null, data);
        });
    });
};

const sendNotificationToUser = function(payload){
    let pushDeviceService =  new aws.Lambda({ region: "us-west-2" });
    return new Promise(function (resolve, reject) {
        pushDeviceService.invoke({
            FunctionName: "notifications-qa-sendNotificationToUser", //eslint-disable-line
            Payload: JSON.stringify({ body: payload }),
            InvocationType: 'Event'
        }, function (error, data) {
            if (error) {
                return reject(error);
            }
            resolve(null, data);
        });
    });
};


module.exports = {
    sendNotificationToStore: sendNotificationToStore,
    sendNotificationToDevice: sendNotificationToDevice,
    sendNotificationToUser: sendNotificationToUser
};