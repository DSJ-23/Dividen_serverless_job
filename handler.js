const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const uuid = require('uuid/v4');

const dividens = process.env.DIVIDENS_TABLE;

function response(statusCode, message) {
    return {
      statusCode: statusCode,
      body: JSON.stringify(message)
    };
  }

module.exports.createInstance = (event, context, callback) => {

    let stock = {
        id: uuid(),
        ticker: 'T',
        stock: 'Fake Company',
        yield: 7.32
    };

    return db.put({
        TableName: dividens,
        Item: stock
    }).promise()
        .then(() => {
            callback(null, response(201, post))
        })
        .catch(err => response(null, response(err.statusCode, err)))
}
