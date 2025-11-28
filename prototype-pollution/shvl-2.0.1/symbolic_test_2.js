function get(object, path, def) {
  return (object = (path.split ? path.split('.') : path).reduce(function (obj, p) {
    return obj && obj[p];
  }, object)) === undefined ? def : object;
}

function set(object, path, val, obj) {
  return ((path = path.split ? path.split('.') : path.slice(0))
    .slice(0, -1)
    .reduce(function (obj, p) {
      return (obj[p] = obj[p] || {});
    }, (obj = object))[path.pop()] = val), object;
}

module.exports = { get, set };

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
