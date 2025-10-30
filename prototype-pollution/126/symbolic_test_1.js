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
var src_obj = esl_symbolic.polluted_object(2);
module.exports(dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
