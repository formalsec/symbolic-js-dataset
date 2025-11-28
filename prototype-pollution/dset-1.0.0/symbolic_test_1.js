module.exports = function(obj, keys, val) {
  keys.split && (keys = keys.split('.'));
  var i = 0, l = keys.length, t = obj, x;
  for (; i < l; ++i) {
    x = t[keys[i]];
    if (i === l - 1) {
      t[keys[i]] = val;
    } else {
      t[keys[i]] = x == null ? {} : x;
    }

    t = t[keys[i]];
  }
}

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
