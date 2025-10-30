"use strict";
/* IMPORT */
function clone(object, base) {
  if (base === void 0) { base = object.constructor(); }
  for (var key in object) {
    var value = object[key];
    if (typeof value === 'object' && value !== null) {
      base[key] = clone(value, value.constructor());
    }
    else {
      base[key] = value;
    }
  }
  return base;
}

function isPrimitive(val) {
  if (typeof val === 'object') {
    return val === null;
  }
  return typeof val !== 'function';
}

/* MERGE */
function merge(objects) {
  var target = clone(objects[0]);
  for (var i = 1, l = objects.length; i < l; i++) {
    mergeObjects(target, objects[i]);
  }
  return target;
}
function mergeObjects(target, source) {
  for (var key in source) {
    var value = source[key];
    if (isPrimitive(value)) {
      if (value !== undefined || !(key in target)) {
        target[key] = value;
      }
    }
    else if (!target[key] || Array.isArray(value)) {
      target[key] = clone(value);
    }
    else {
      target[key] = mergeObjects(target[key], value);
    }
  }
  return target;
}
/* EXPORT */
module.exports = merge;
module.exports.default = merge;
Object.defineProperty(module.exports, "__esModule", { value: true });

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var dst_obj = {  };
var src_obj = esl_symbolic.polluted_object(1);
module.exports(dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
