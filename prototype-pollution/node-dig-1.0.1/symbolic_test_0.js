function dig(object, keys, value) {
  const key = keys.shift();
  if (keys.length == 0) {
    return value ? (object[key] = value) : object[key];
  }

  if (!(key in object)) {
    object[key] = {};
  }

  return dig(object[key], keys, value);
}

module.exports = dig;

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var dst_obj = {  };
// Concrete test 
var src_obj = { ["__proto__"] : { "polluted" : "yes" } };
module.exports(dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
