const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Customer = require('../models/customerSchema.cjs');

// Connecting to database


const MongoClient = mongodb.MongoClient;

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("<databaseName>").collection("<collectionName>");
  // perform actions on the collection object
  client.close();
});
module.exports = router;
