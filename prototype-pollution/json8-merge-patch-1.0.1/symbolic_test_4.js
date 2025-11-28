"use strict";

const OBJECT = "object";

/**
 * apply a JSON merge patch
 * https://tools.ietf.org/html/rfc7396
 * @param  {Object} doc    - JSON object document
 * @param  {Object} patch  - JSON object patch
 * @return {Object}        - JSON object document
 */
module.exports = function apply(doc, patch) {
  if (typeof patch !== OBJECT || patch === null || Array.isArray(patch)) {
    return patch;
  }

  if (typeof doc !== OBJECT || doc === null || Array.isArray(doc)) doc = {};

  for (const k in patch) {
    const v = patch[k];
    if (v === null) {
      delete doc[k];
      continue;
    }
    doc[k] = apply(doc[k], v);
  }

  return doc;
};

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var doc = {  };
var prop_1 = esl_symbolic.string("prop_1");
var prop_2 = esl_symbolic.string("prop_2");
var prop_3 = esl_symbolic.string("prop_3");
var value = esl_symbolic.string("value");
var patch = { [prop_1] : { [prop_2] :  { [prop_3] : value } } };
module.exports(doc, patch);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
