/*!
 * defaults-deep <https://github.com/jonschlinkert/defaults-deep>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

// 'use strict';

 function isObject(val) {
  return typeof val !== 'undefined' && val !== null
    && (typeof val === 'object' || typeof val === 'function');
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

function defaultsDeep(target, objects) {
  arguments = [target, objects];
  target = target || {};

  function copy(target, current) {
    forOwn(current, function (value, key) {
      var val = target[key];
      // add the missing property, or allow a null property to be updated
      if (val == null) {
        target[key] = value;
      } else if (isObject(val) && isObject(value)) {
        defaultsDeep(val, value);
      }
    });
  }

  var len = arguments.length, i = 0;
  while (i < len) {
    var obj = arguments[i++];
    if (obj) {
      copy(target, obj);
    }
  }
  return target;
};

/**
 * Expose `defaultsDeep`
 */

module.exports = defaultsDeep;

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
