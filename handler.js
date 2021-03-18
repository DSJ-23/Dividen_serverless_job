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

module.exports.getAllInfo = (event, contenxt, callback) => {
    return db.scan({
        TableName: dividens
    }).promise()
        .then((res) => {
            callback(null, response(201, res.Items))
    })
        .catch(err => response(null, response(err.statusCode, err)))
}

module.exports.getByTicker = (event, contenxt, callback) => {
    
}

module.exports.byId= (event, contenxt, callback) => {

    let ticker = event['ticker'] || 'value2';
    console.log(event['id']);
    console.log('HELLO')
    let params = {
        Key: {
            'id': event['id'] || "a3b4d184-a58f-428f-a372-ffe5ab324491"
        },
        TableName: dividens
    }

    return db.get(params).promise()
        .then((res) => {
            if (res.Item) callback(null, response(200, res.Item));
            else callback(null, response(404, {error: "Not found"}));
        })
        .catch(err => response(null, response(err.statusCode, err)))
}

module.exports.deleteSingle = (event, context, callback) => {
    let params = {
        Key: {
            id: event['id'] || "a3b4d184-a58f-428f-a372-ffe5ab324491"
        },
        TableName: dividens
    }
    return db.delete(params).promise()
        .then(() => callback(null, 200, {message: `post created ${event['id']}`}))
        .catch(err => response(null, response(err.statusCode, err)))
}

