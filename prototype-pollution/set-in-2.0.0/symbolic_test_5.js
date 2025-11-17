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
var object = [ esl_symbolic.string("object0") ];
var path = [ esl_symbolic.string("path0"), esl_symbolic.string("path1") ];
var value = esl_symbolic.any("value");
module.exports(object, path, value);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
