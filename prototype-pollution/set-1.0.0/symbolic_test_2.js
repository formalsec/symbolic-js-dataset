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
var dst_obj = {  };
var prop_1 = esl_symbolic.string("prop_1");
var prop_2 = esl_symbolic.string("prop_2");
var prop_3 = esl_symbolic.string("prop_3");
var value = esl_symbolic.string("value");
var src_obj = { [prop_1] : { [prop_2] :  { [prop_3] : value } } };
module.exports(dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
