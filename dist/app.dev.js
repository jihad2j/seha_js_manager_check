"use strict";

var express = require('express');

var app = express();

var path = require('path');

var logger = require('morgan');

var cookieParser = require('cookie-parser');

var indexsickleavers = require('./routes/sickleaves.js');

var usersRouter = require('./routes/users.js');

var managerRouter = require('./routes/manager.js');

var modelsickleave = require('./routes/model_sikleaves.js');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var Customer = require('./models/customerSchema.cjs');

var methodOverride = require('method-override');

var port = 3501;
var uri = "mongodb+srv://zoolka:zzzzz11111@masarproject.daj3l2l.mongodb.net/?retryWrites=true&w=majority&appName=masarproject";
mongoose.connect(uri).then(function () {
  return console.log('You successfully connected to MongoDB!');
})["catch"](function (err) {
  return console.error('Error connecting to MongoDB:', err);
}); // Your existing code starts here

var _require = require('url'),
    fileURLToPath = _require.fileURLToPath; // Moved this line here


var _require2 = require('path'),
    dirname = _require2.dirname;

var methodOverride = require('method-override');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"](path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use('/', indexsickleavers);
app.use('/users', usersRouter);
app.use('/manager', managerRouter);
app.use('/model_sikleaves', modelsickleave);
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
app.get('/main', function (req, res) {
  res.render('index', {
    title: 'Express'
  });
});
app.get('/slenquiry', function (req, res) {
  res.render('sickleaves', {
    title: 'Express'
  });
});
app.get('/addqr', function (req, res) {
  res.render('sickleavesadd', {
    title: 'Express'
  });
});
app.get('/editqr/:id', function (req, res) {
  Customer.findById(req.params.id).then(function (result) {
    res.render('sickleavesedit', {
      obj: result
    });
  })["catch"](function (err) {
    console.log(err);
  });
}); // Rest of the code...

app.listen(port, function () {
  console.log('App is running on http://localhost:' + port);
});
module.exports = app;
//# sourceMappingURL=app.dev.js.map
