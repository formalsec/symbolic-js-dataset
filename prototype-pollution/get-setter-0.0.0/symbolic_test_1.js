'use strict';

module.exports = {
    get : getter,
    set : setter
};

function getter(path) {
    var arr,
        data = this;


    if (!path) {
        return data;
    }

    arr = path.split('.');
    while (arr.length && data) {
        // will work with arrays
        data = data[arr.shift()];
    }

    return data;
}

function setter(path, value) {
    var arr,
        item,
        obj = this;

    arr = path.split('.');
    while (arr.length > 1) {
        item = arr.shift();
        if (!obj[item]) {
            // will not work with arrays
            obj[item] = {};
        }
        obj = obj[item];
    }

    obj[arr.shift()] = value;

    return this;
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
