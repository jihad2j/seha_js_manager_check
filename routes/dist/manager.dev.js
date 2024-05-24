"use strict";

var express = require('express');

var Customer = require('../models/customerSchema.cjs');

var router = express.Router(); // Retrieve all users

router.get('/user', function _callee(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Customer.find());

        case 3:
          users = _context.sent;
          res.render('manager', {
            users: users
          }); // Pass the users to the Pug template

          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error('Error retrieving users:', _context.t0);
          res.status(500).json({
            error: 'Internal Server Error'
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;
//# sourceMappingURL=manager.dev.js.map
