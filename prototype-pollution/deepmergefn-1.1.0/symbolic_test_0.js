/**
 * Merge deeply two objects
 * @param {any} target
 * @param {any} source
 */
function deepMerge(target, source) {
    for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
            if (target[prop] && typeof source[prop] === "object") {
                deepMerge(target[prop], source[prop]);
            } else {
                target[prop] = source[prop];
            }
        }
    }

    return target;
}

module.exports = deepMerge;
var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var dst_obj = {  };
// Concrete test 
var src_obj = { ["__proto__"] : { "polluted" : "yes" } };
module.exports(dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
