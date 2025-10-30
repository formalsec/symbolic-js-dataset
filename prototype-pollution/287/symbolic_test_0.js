var slice = Array.prototype.slice,
  each = Array.prototype.forEach;

var extend = function(obj) {
  if (typeof obj !== 'object') throw obj + ' is not an object';

  var sources = slice.call(arguments, 1);

  each.call(sources, function(source) {
    if (source) {
      for (var prop in source) {
        if (typeof source[prop] === 'object' && obj[prop]) {
          extend.call(obj, obj[prop], source[prop]);
        } else {
          obj[prop] = source[prop];
        }
      }
    }
  });

  return obj;
}

module.exports = extend;

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var deep = esl_symbolic.boolean("deep");
var dst_obj = {  };
var src_obj = esl_symbolic.polluted_object(2);
module.exports(deep, dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
