"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var customerSchema = new _mongoose["default"].Schema({
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
  inputdaynum: String
});

var Customer = _mongoose["default"].model('Customer', customerSchema);

var _default = Customer;
exports["default"] = _default;
//# sourceMappingURL=customerSchema.dev.js.map
