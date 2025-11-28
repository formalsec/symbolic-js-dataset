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
var dst_obj = {  };
var prop_1 = esl_symbolic.string("prop_1");
var prop_2 = esl_symbolic.string("prop_2");
var prop_3 = esl_symbolic.string("prop_3");
var value = esl_symbolic.string("value");
var src_obj = { [prop_1] : { [prop_2] :  { [prop_3] : value } } };
module.exports(dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
