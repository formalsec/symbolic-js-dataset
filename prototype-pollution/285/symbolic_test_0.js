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
var deep = esl_symbolic.boolean("deep");
var dst_obj = {  };
var src_obj = esl_symbolic.polluted_object(2);
module.exports(deep, dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
