var assert = require('assert')

function setIn (object, path, value) {
  assert.equal(typeof object, 'object', 'setIn: expected object as first argument.')
  assert.ok(Array.isArray(path), 'setIn: expected array path as second argument.')

  return recursivelySetIn(object, path, value, 0)
}

function recursivelySetIn (object, path, value, index) {
  if (index === path.length) {
    return value
  }

  object = object || {}

  var key = path[index]

  if (key === '-') {
    assert.ok(Array.isArray(object), 'setIn: "-" in path must correspond to array.')
    key = object.length
  }

  var next = recursivelySetIn(object[key], path, value, ++index)

  return set(object, key, next)
}

function set (object, key, value) {
  object[key] = value
  return object
}

module.exports = setIn;

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
