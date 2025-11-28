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
var target = {  };
var prop_1 = esl_symbolic.string("prop_1");
var prop_2 = esl_symbolic.string("prop_2");
var value = esl_symbolic.string("value");
var source = { [prop_1] : { [prop_2] : value } };
module.exports(target, source);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
