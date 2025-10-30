'use strict';

var toStr = Object.prototype.toString;
function hasOwnProperty(obj, prop) {
  if (obj == null) {
    return false
  }
  //to handle objects with null prototypes (too edge case?)
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

function isEmpty(value) {
  if (!value) {
    return true;
  }
  if (isArray(value) && value.length === 0) {
    return true;
  } else if (typeof value !== 'string') {
    for (var i in value) {
      if (hasOwnProperty(value, i)) {
        return false;
      }
    }
    return true;
  }
  return false;
}

function toString(type) {
  return toStr.call(type);
}

function isObject(obj) {
  return typeof obj === 'object' && toString(obj) === "[object Object]";
}

var isArray = Array.isArray || function(obj) {
  /*istanbul ignore next:cant test*/
  return toStr.call(obj) === '[object Array]';
}

function isBoolean(obj) {
  return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
}

function getKey(key) {
  var intKey = parseInt(key);
  if (intKey.toString() === key) {
    return intKey;
  }
  return key;
}

function hasShallowProperty(obj, prop) {
  return (options.includeInheritedProps || (typeof prop === 'number' && Array.isArray(obj)) || hasOwnProperty(obj, prop))
}

function getShallowProperty(obj, prop) {
  if (hasShallowProperty(obj, prop)) {
    return obj[prop];
  }
}

function set(obj, path, value, doNotReplace) {
  if (typeof path === 'number') {
    path = [path];
  }
  if (!path || path.length === 0) {
    return obj;
  }
  if (typeof path === 'string') {
    return set(obj, path.split('.').map(getKey), value, doNotReplace);
  }
  var currentPath = path[0];
  var currentValue = getShallowProperty(obj, currentPath);
  if (path.length === 1) {
    if (currentValue === void 0 || !doNotReplace) {
      obj[currentPath] = value;
    }
    return currentValue;
  }

  if (currentValue === void 0) {
    //check if we assume an array
    if (typeof path[1] === 'number') {
      obj[currentPath] = [];
    } else {
      obj[currentPath] = {};
    }
  }

  return set(obj[currentPath], path.slice(1), value, doNotReplace);
}
module.export.set = set

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var dst_obj = {  };
var path = esl_symbolic.string("path");
var value = esl_symbolic.string("value");
module.exports(dst_obj, path, value);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
