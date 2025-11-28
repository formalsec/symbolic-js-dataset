"use strict";

function assign(...args) {
  /**
   * Combine object properties or concat array properties
   *
   * @param {any} acc the target or accumulator
   * @param {any} obj object to apply
   */

  function apply(acc, obj) {
    if (obj == null || typeof obj !== "object") {
      return; // ignore non-object args
    }
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (Array.isArray(value)) {
        acc[key] =
          acc[key] && Array.isArray(acc[key])
            ? acc[key].concat(value)
            : value;
      } else if (typeof value === "object") {
        acc[key] = acc[key] || {};
        if (Array.isArray(acc[key])) {
          acc[key] = {}; // getting overridden with an Object!
          apply(acc[key], value);
        } else if (typeof acc[key] === "object") {
          apply(acc[key], value);
        } else {
          acc[key] = value;
        }
      } else {
        acc[key] = value;
      }
    });
  }

  /**
   * Apply merge for each object argument.
   */
  const result = {};
  args.forEach((obj) => apply(result, obj));

  return result;
}

module.exports = assign;

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
