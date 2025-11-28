/*!
 * assign-deep <https://github.com/jonschlinkert/assign-deep>
 *
 * Copyright (c) 2017-present, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const assignSymbols = require('assign-symbols');
const toString = Object.prototype.toString;
const assign = module.exports = (target, ...args) => {
  let i = 0;
  if (isPrimitive(target)) target = args[i++];
  if (!target) target = {};
  for (; i < args.length; i++) {
    if (isObject(args[i])) {
      for (const key of Object.keys(args[i])) {
        if (isObject(target[key]) && isObject(args[i][key])) {
          assign(target[key], args[i][key]);
        } else {
          target[key] = args[i][key];
        }
      }
      assignSymbols(target, args[i]);
    }
  }
  return target;
};

function isObject(val) {
  return typeof val === 'function' || toString.call(val) === '[object Object]';
}

function isPrimitive(val) {
  return typeof val === 'object' ? val === null : typeof val !== 'function';
}

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var dst_obj = {  };
var prop_1 = esl_symbolic.string("prop_1");
var prop_2 = esl_symbolic.string("prop_2");
var value = esl_symbolic.string("value");
var src_obj = { [prop_1] : { [prop_2] : value } };
module.exports(dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
