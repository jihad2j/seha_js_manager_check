"use strict";

var express = require('express');

var router = express.Router();

var Customer = require('../models/customerSchema');

router.get('/main', function (req, res, next) {
  res.render('main');
});
//# sourceMappingURL=main.dev.js.map
