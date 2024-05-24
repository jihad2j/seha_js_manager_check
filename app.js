const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const indexsickleavers = require('./routes/sickleaves.js');
const usersRouter = require('./routes/users.js');
const managerRouter = require('./routes/manager.js');
const modelsickleave = require('./routes/model_sikleaves.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Customer = require('./models/customerSchema.cjs');
var methodOverride = require('method-override')

const port = 3501

const uri = "mongodb+srv://zoolka:zzzzz11111@masarproject.daj3l2l.mongodb.net/?retryWrites=true&w=majority&appName=masarproject";

mongoose.connect(uri)
  .then(() => console.log('You successfully connected to MongoDB!'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


// Your existing code starts here
const { fileURLToPath } = require('url'); // Moved this line here
const { dirname } = require('path');
var methodOverride = require('method-override')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

app.use('/', indexsickleavers);
app.use('/users', usersRouter);
app.use('/manager', managerRouter);
app.use('/model_sikleaves', modelsickleave);

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/main', function(req, res) {
  res.render('index', { title: 'Express' });
});
app.get('/slenquiry', function(req, res) {
  res.render('sickleaves', { title: 'Express' });
});
app.get('/addqr', function(req, res) {
  res.render('sickleavesadd', { title: 'Express' });
});

app.get('/editqr/:id', (req, res) => {
  Customer.findById(req.params.id).then((result) => {
    res.render('sickleavesedit', {
      obj: result
    });
  }).catch(err => {
    console.log(err);
  });
});
// Rest of the code...

app.listen(port, function() {
  console.log('App is running on http://localhost:' + port);
});
module.exports = app;
