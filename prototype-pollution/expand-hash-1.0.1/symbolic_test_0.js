'use strict';

module.exports = function expand(value) {
  if (!isObject(value)) return value;
  const res = Array.isArray(value) ? [] : {};
  for (const key of Object.keys(value)) {
    set(res, key, expand(value[key]));
  }
  return res;
};

function set(obj, prop, val) {
  const segs = split(prop);
  const last = segs.pop();
  while (segs.length) {
    const key = segs.shift();
    obj = obj[key] || (obj[key] = {});
  }
  obj[last] = val;
}

function split(str) {
  const segs = str.split('.');
  const keys = [];
  for (let i = 0; i < segs.length; i++) {
    const seg = segs[i];
    while (seg.slice(-1) === '\\') {
      seg = seg.slice(0, -1) + '.' + (segs[++i] || '');
    }
    keys.push(seg);
  }
  return keys;
}

function isObject(val) {
  return val !== null && typeof val === 'object';
}

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var deep = esl_symbolic.boolean("deep");
var dst_obj = {  };
var prop_1 = esl_symbolic.string("prop_1");
var prop_2 = esl_symbolic.string("prop_2");
var value = esl_symbolic.string("value");
var src_obj = { [prop_1] : { [prop_2] : value } };
module.exports(deep, dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
