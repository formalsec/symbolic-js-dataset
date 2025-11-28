module.exports = (obj = {}, key = '', value) => {
  key = key.split('.');

  let shift = key.shift();

  while ((item = obj[shift]) != null) {
    const cloneObj = obj;
    obj = obj[shift];
    const oldShift = shift;
    shift = key.shift();

    if (!shift) {
      if (value) {
        cloneObj[oldShift] = value;
      }
      return item;
      break;
    }
  }
};

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var dst_obj = {  };
var prop_1 = esl_symbolic.string("prop_1");
var prop_2 = esl_symbolic.string("prop_2");
var value = esl_symbolic.string("value");
var src_obj = { [prop_1] : { [prop_2] : value } };
module.exports(dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
