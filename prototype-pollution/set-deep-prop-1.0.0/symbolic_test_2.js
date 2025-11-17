/**
* Sets a deeply nested object or array property.
*
* @param {object} obj -- The deeply nested object
* @param {array} path -- The path to the object as an array. Ex: ['topkey', 'nextkey', 0, 'nestedKey']
* @param {any} value -- The new value to set.

* @return {object} -- The updated object. Note that this method mutates the original object.
*/

module.exports = function setDeepProp(obj, path, value) {
  let current = obj

  // Get to the proper key
  for (let i = 0; i < path.length - 1; i++) {
    current = current[path[i]]
  }

  // Set the proper key
  current[path[path.length - 1]] = value

  return obj
}

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var dst_obj = {  };
var src_obj = esl_symbolic.polluted_object(3);
module.exports(dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
