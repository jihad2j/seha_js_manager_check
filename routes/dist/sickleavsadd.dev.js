"use strict";

var express = require('express');

var router = express.Router();

var Customer = require('../models/customerSchema'); // Render sickleavesadd view


router.get('/addqr', function (req, res, next) {
  res.render('sickleavesadd', {
    title: 'Express'
  });
});
app.post('/user/addqr', function (req, res) {
  Customer.create(req.body).then(function () {
    console.log(req.body);
  })["catch"](function (err) {
    console.log(err);
  });
});
//# sourceMappingURL=sickleavsadd.dev.js.map
