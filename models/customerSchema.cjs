const mongoose = require('mongoose');



const customerSchema = new mongoose.Schema({
  inputgsl: String,
  inputindurationh: String,
  inputdurationm: String,
  inputdatefrom: String,
  inputdateto: String,
  inputdatehin: String,
  inputdatemin: String,
  inputdatehout: String,
  inputdatemout: String,
  inputdatesick: String,
  inputnamear: String,
  inputnameen: String,
  inputidentity: String,
  inputnationalityar: String,
  inputnationalityen: String,
  inputworkar: String,
  inputworken: String,
  inputdoctorar: String,
  inputdoctoren: String,
  inputworktypear: String,
  inputworktypeen: String,
  inputcentralnamear: String,
  inputcentralnameen: String,
  inputcentralid: String,
  inputcentralnum: String,
  inputtimeparint: String,
  inputdateparint: String,
  inputdaynum: String,
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;