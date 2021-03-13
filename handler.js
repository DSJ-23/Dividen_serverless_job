const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const { v4: uuidv4 }= require('uuid');

const dividens = process.env.DIVIDENS_TABLE;

function response(statusCode, message) {
    return {
      statusCode: statusCode,
      body: JSON.stringify(message)
    };
  }

module.exports.createInstance = (event, context, callback) => {

    let stock;

    if (event.hasOwnProperty('ticker')){
        stock = {
            id: uuidv4(),
            ticker: event['ticker'],
            stock: event['stock'] || null,
            yield: event['yield'] || null
        }
    } else {
        stock = {
            id: uuidv4(),
            ticker: 'T',
            stock: 'Fake Company',
            yield: 7.32
        }
    };
        

    return db.put({
        TableName: dividens,
        Item: stock
    }).promise()
        .then(() => {
            callback(null, response(201, stock))
        })
        .catch(err => response(null, response(err.statusCode, err)))
}
