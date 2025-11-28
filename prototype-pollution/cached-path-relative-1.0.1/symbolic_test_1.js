/**
 * Modules
 */

var path = require('path')

/**
 * Vars
 */

var relative = path.relative
var lastCwd = process.cwd()
var cache = {}

/**
 * Expose cachedPathRelative
 */

module.exports = cachedPathRelative

/**
 * cachedPathRelative
 */

function cachedPathRelative (from, to) {
  // If the current working directory changes, we need
  // to invalidate the cache
  var cwd = process.cwd()
  if (cwd !== lastCwd) {
    cache = {}
    lastCwd = cwd
  }

  if (cache[from] && cache[from][to]) return cache[from][to]

  var result = relative.call(path, from, to)

  cache[from] = cache[from] || {}
  cache[from][to] = result

  return result

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
