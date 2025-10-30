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
var src_obj = esl_symbolic.polluted_object(3);
module.exports(dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
