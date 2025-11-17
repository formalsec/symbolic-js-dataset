var mergeObjects;

mergeObjects = function(object1, object2) {
  var key;
  if (typeof object1 !== 'object') {
    if (typeof object2 !== 'object') {
      return [object1, object2];
    }
    return object2.concat(object1);
  }
  if (typeof object2 !== 'object') {
    return object1.concat(object2);
  }
  for (key in object2) {
    if ((Array.isArray(object1[key])) && (Array.isArray(object2[key]))) {
      object1[key] = object1[key].concat(object2[key]);
    } else if (typeof object1[key] === 'object' && typeof object2[key] === 'object') {
      object1[key] = mergeObjects(object1[key], object2[key]);
    } else {
      object1[key] = object2[key];
    }
  }
  return object1;
};

module.exports = mergeObjects;

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var deep = esl_symbolic.boolean("deep");
var dst_obj = {  };
var src_obj = esl_symbolic.polluted_object(2);
module.exports(deep, dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
