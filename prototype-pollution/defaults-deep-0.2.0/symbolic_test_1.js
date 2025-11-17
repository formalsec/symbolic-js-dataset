/*!
 * defaults-deep <https://github.com/jonschlinkert/defaults-deep>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

function isObject(val) {
  return val !== null && (typeof val === 'object' || typeof val === 'function');
}

function forIn(obj, fn, thisArg) {
  for (var key in obj) {
    if (fn.call(thisArg, obj[key], key, obj) === false) {
      break;
    }
  }
}

var hasOwn = Object.prototype.hasOwnProperty;

function forOwn(obj, fn, thisArg) {
  forIn(obj, function(val, key) {
    if (hasOwn.call(obj, key)) {
      return fn.call(thisArg, obj[key], key, obj);
    }
  });
}

module.exports = function defaultsDeep(o, objects) {
  if (!o || !objects) { return o || {}; }

  function copy(o, current) {
    forOwn(current, function(value, key) {
      var val = o[key];
      if (val == null) {
        o[key] = value;
      } if (isObject(val) && isObject(value)) {
        defaultsDeep(val, value);
      }
    });
  }

  var len = arguments.length, i = 0;
  while (i < len) {
    var obj = arguments[i++];
    console.log(obj)
    if (obj) {
      copy(o, obj);
    }
  }
  return o;
};

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var dst_obj = {  };
var src_obj = esl_symbolic.polluted_object(2);
module.exports(dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
