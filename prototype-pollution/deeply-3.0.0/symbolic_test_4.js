// Public API
module.exports = reduceObject;

function recursiveMerge(target, source) {
  if (Array.isArray(target) && Array.isArray(source)) {
    return target.concat(source);
  } else if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (
        Object.prototype.hasOwnProperty.call(source, key)
      ) {
        target[key] = recursiveMerge(target[key], source[key]);
      }
    }

    return target;
  }
  return source;
}

function isObject(value) {
  return value !== null && typeof value === "object";
}

function reduceObject(target, source) {
  // clone exposed properties
  Object.keys(source).forEach((key) => {
    target[key] = recursiveMerge(target[key], source[key]);
  });

  return target;
}

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var target = {  };
var prop_1 = esl_symbolic.string("prop_1");
var prop_2 = esl_symbolic.string("prop_2");
var prop_3 = esl_symbolic.string("prop_3");
var value = esl_symbolic.string("value");
var source = { [prop_1] : { [prop_2] :  { [prop_3] : value } } };
module.exports(target, source);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
