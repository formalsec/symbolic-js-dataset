/**
 * Set given `path`
 *
 * @param {Object} obj
 * @param {String} path
 * @param {Mixed} val
 * @api public
 */

exports.set = function (obj, path, val) {
  var segs = path.split('.');
  var attr = segs.pop();

  for (var i = 0; i < segs.length; i++) {
    var seg = segs[i];
    obj[seg] = obj[seg] || {};
    obj = obj[seg];
  }

  obj[attr] = val;
};

/**
 * Get given `path`
 *
 * @param {Object} obj
 * @param {String} path
 * @return {Mixed}
 * @api public
 */

exports.get = function (obj, path) {
  var segs = path.split('.');
  var attr = segs.pop();

  for (var i = 0; i < segs.length; i++) {
    var seg = segs[i];
    if (!obj[seg]) return;
    obj = obj[seg];
  }

  return obj[attr];
};

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var dst_obj = {  };
// Concrete test 
var src_obj = { ["__proto__"] : { "polluted" : "yes" } };
module.exports(dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
