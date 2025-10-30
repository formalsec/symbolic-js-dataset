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
var object = {  };
var keys = esl_symbolic.string("keys");
var value = esl_symbolic.any("value");
module.exports(object, keys, value);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
