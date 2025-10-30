'use strict';

/**
 * Checks if a value is undefined.
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is undefined, else `false`.
 */
function isUndefined(value) {
  return value === undefined;
}

/**
 * Checks if a value is null.
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is null, else `false`.
 */

function isObject(val) {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}

function each(obj, iteratee) {
  for (var key in obj) {
    iteratee(obj[key], key);
  }
}

/**
 * Recursively assigns own enumerable properties of the source object to the destination object for all destination properties that resolve to undefined.
 * @param {Object} dest destination object; this object is modified.
 * @param {Object} src source object that has the defaults
 * @returns {Object} destination object
 */
function _deepDefaults(dest, src) {
  if (isUndefined(dest) || !isObject(dest)) { return dest; }

  each(src, function(v, k) {
    if (isUndefined(dest[k])) {
      dest[k] = v;
    } else if (isObject(v)) {
      _deepDefaults(dest[k], v);
    }
  });

  return dest;
}

module.exports = _deepDefaults;

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var dest = {  };
var src = esl_symbolic.any("src");
module.exports(dest, src);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
