// const { connect, connection } = require('mongoose');

// // Node will look for this environment variable and if it exists, it will use it. Otherwise, it will assume that this application is running locally
// const connection =
//   process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nosql-socialnetworkapi'

// connect(connection);
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/nosql-socialnetworkapi')

module.exports = mongoose.connection;