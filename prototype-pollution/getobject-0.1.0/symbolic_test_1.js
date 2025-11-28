/*
 * getobject
 * https://github.com/cowboy/node-getobject
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 */

'use strict';

var getobject = {};

// Split strings on dot, but only if dot isn't preceded by a backslash. Since
// JavaScript doesn't support lookbehinds, use a placeholder for "\.", split
// on dot, then replace the placeholder character with a dot.
function getParts(str) {
  return str.split(".");
}

// Get the value of a deeply-nested property exist in an object.
getobject.get = function(obj, parts, create) {
  if (typeof parts === 'string') {
    parts = getParts(parts);
  }

  var part;
  while (typeof obj === 'object' && obj && parts.length) {
    part = parts.shift();
    if (!(part in obj) && create) {
      obj[part] = {};
    }
    obj = obj[part];
  }

  return obj;
};

// Set a deeply-nested property in an object, creating intermediary objects
// as we go.
getobject.set = function(obj, parts, value) {
  parts = getParts(parts);

  var prop = parts.pop();
  obj = getobject.get(obj, parts, true);
  if (obj && typeof obj === 'object') {
    return (obj[prop] = value);
  }
};

// Does a deeply-nested property exist in an object?
getobject.exists = function(obj, parts) {
  parts = getParts(parts);

  var prop = parts.pop();
  obj = getobject.get(obj, parts);

  return typeof obj === 'object' && obj && prop in obj;
};

module.exports = getobject;

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var dst_obj = {  };
// Concrete test 
var src_obj = { ["__proto__"] : { "polluted" : "yes" } };
module.exports(dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
