/**
 * Merge two objects and concatenate arrays that are values of the same object key
 *
 * @author Oleksii Shevchenko <shevaroller@gmail.com> (http://shevaroller.me)
 * @since  6 September 2015
 */

var mergeObjects;

mergeObjects = function(object1, object2) {
  var key;

  // concatenate not objects into arrays
  if (typeof object1 !== 'object') {
    if (typeof object2 !== 'object') {
      return [object1, object2];
    }
    return object2.concat(object1);
  }
  if (typeof object2 !== 'object') {
    return object1.concat(object2);
  }

  // merge object2 into object1
  for (key in object2) {
    if ((Array.isArray(object1[key])) && (Array.isArray(object2[key]))) {
      // concatenate arrays that are values of the same object key
      object1[key] = object1[key].concat(object2[key]);
    } else if (typeof object1[key] === 'object' && typeof object2[key] === 'object') {
      // deep merge object2 into object1
      object1[key] = mergeObjects(object1[key], object2[key]);
    } else {
      object1[key] = object2[key];
    }
  }
  return object1;
};

/**
 * Exports Module mergeObjects
 */
module.exports = mergeObjects;
var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var dst_obj = {  };
var path = esl_symbolic.string("path");
var value = esl_symbolic.string("value");
module.exports(dst_obj, path, value);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
