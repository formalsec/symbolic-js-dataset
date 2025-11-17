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
var src_obj = esl_symbolic.polluted_object(2);
module.exports(dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
