'use strict';

const isObject = val => typeof val === 'object' || typeof val === 'function';
const set = (obj, parts, length, val) => {
  let tmp = obj;
  let i = 0;
  for (; i < length - 1; i++) {
    const part = parts[i];
    tmp = !isObject(tmp[part]) ? tmp[part] = {} : tmp[part];
  }
  tmp[parts[i]] = val;
  return obj;
};

module.exports = (obj, path, val, sep = '.') => {
  if (!isObject(obj) || !path || !path.length) {
    return obj;
  }
  const parts = Array.isArray(path) ? path : String(path).split(sep);
  const { length } = parts;
  if (length === 1) {
    obj[parts[0]] = val;
    return obj;
  }
  return set(obj, parts, length, val);
};

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var obj = {  };
var path = [ esl_symbolic.string("path0") ];
var val = esl_symbolic.function("val");
var sep = esl_symbolic.any("sep");
module.exports(obj, path, val, sep);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
