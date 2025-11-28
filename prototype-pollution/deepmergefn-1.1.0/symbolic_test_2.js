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
var prop_1 = esl_symbolic.string("prop_1");
var prop_2 = esl_symbolic.string("prop_2");
var prop_3 = esl_symbolic.string("prop_3");
var value = esl_symbolic.string("value");
var src_obj = { [prop_1] : { [prop_2] :  { [prop_3] : value } } };
module.exports(dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
