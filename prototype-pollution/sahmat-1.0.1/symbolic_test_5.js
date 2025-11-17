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
var obj = {  };
var key = [ esl_symbolic.string("key0"), esl_symbolic.string("key1") ];
var value = esl_symbolic.any("value");
module.exports(obj, key, value);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
