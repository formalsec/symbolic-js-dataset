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
var dst_obj = {  };
// Concrete test 
var src_obj = { ["__proto__"] : { "polluted" : "yes" } };
module.exports(dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
