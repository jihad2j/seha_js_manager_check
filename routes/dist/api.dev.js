"use strict";

var mongoose = require('mongoose');

var express = require('express');

var router = express.Router();

var Customer = require('../models/customerSchema.cjs'); // Connecting to database


var MongoClient = mongodb.MongoClient;
var client = new MongoClient(uri, {
  useNewUrlParser: true
});
client.connect(function (err) {
  var collection = client.db("<databaseName>").collection("<collectionName>"); // perform actions on the collection object

  client.close();
});
module.exports = router;
//# sourceMappingURL=api.dev.js.map
