"use strict";

var express = require('express');

var router = express.Router();

var Customer = require('../models/customerSchema');

router.get('/main', function (req, res) {
  res.render('index');
});
module.exports = router;
//# sourceMappingURL=index.dev.js.map
