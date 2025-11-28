"use strict";

function unflatten(obj = {}) {
  const regex = /\.?([^.\[\]]+)|\[(\d+)\]/g;
  const resultholder = {};

  for (const p in obj) {
    let curr = resultholder;
    let prop = "";
    let m = {};

    while ((m = regex.exec(p))) {
      curr = curr[prop] || (curr[prop] = m[2] ? [] : {});
      prop = m[2] || m[1];
    }

    curr[prop] = obj[p];
  }

  return resultholder[""] || resultholder;
}

module.exports = unflatten;

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
