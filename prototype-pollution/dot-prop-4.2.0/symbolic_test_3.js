'use strict';

const isObj = (o) => {
  return typeof o === "object" && o !== null;
}

function getPathSegments(path) {
  const pathArray = path.split('.');
  const parts = [];

  for (let i = 0; i < pathArray.length; i++) {
    let p = pathArray[i];

    while (p[p.length - 1] === '\\' && pathArray[i + 1] !== undefined) {
      p = p.slice(0, -1) + '.';
      p += pathArray[++i];
    }

    parts.push(p);
  }

  return parts;
}

function get(object, path, value) {
  if (!isObj(object) || typeof path !== 'string') {
    return value === undefined ? object : value;
  }

  const pathArray = getPathSegments(path);

  for (let i = 0; i < pathArray.length; i++) {
    if (!Object.prototype.propertyIsEnumerable.call(object, pathArray[i])) {
      return value;
    }

    object = object[pathArray[i]];

    if (object === undefined || object === null) {
      // `object` is either `undefined` or `null` so we want to stop the loop, and
      // if this is not the last bit of the path, and
      // if it did't return `undefined`
      // it would return `null` if `object` is `null`
      // but we want `get({foo: null}, 'foo.bar')` to equal `undefined`, or the supplied value, not `null`
      if (i !== pathArray.length - 1) {
        return value;
      }

      break;
    }
  }

  return object;
}

function set(object, path, value) {
  if (!isObj(object) || typeof path !== 'string') {
    return object;
  }

  const root = object;
  const pathArray = getPathSegments(path);

  for (let i = 0; i < pathArray.length; i++) {
    const p = pathArray[i];

    if (!isObj(object[p])) {
      object[p] = {};
    }

    if (i === pathArray.length - 1) {
      object[p] = value;
    }

    object = object[p];
  }

  return root;
}

function delete_(object, path) {
    if (!isObj(object) || typeof path !== 'string') {
      return;
    }

    const pathArray = getPathSegments(path);

    for (let i = 0; i < pathArray.length; i++) {
      const p = pathArray[i];

      if (i === pathArray.length - 1) {
        delete object[p];
        return;
      }

      object = object[p];

      if (!isObj(object)) {
        return;
      }
    }
}

function has(object, path) {
    if (!isObj(object) || typeof path !== 'string') {
      return false;
    }

    const pathArray = getPathSegments(path);

    for (let i = 0; i < pathArray.length; i++) {
      if (isObj(object)) {
        if (!(pathArray[i] in object)) {
          return false;
        }

        object = object[pathArray[i]];
      } else {
        return false;
      }
    }

    return true;
}
module.exports = {
  get: get,
  set: set,
  delete: delete_,
  has: has
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
