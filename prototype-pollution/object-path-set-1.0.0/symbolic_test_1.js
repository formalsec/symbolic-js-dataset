'use strict';

var setPath = function (obj, path, value, delimiter) {
	var arr;
	var key;
	if (!obj || typeof obj !== 'object') {
		obj = {};
	}
	if (typeof path === 'string') {
		path = path.split(delimiter || '.');
	}
	if (Array.isArray(path) && path.length > 0) {
		arr = path;
		key = arr[0];
		if (arr.length > 1) {
			arr.shift();
			obj[key] = setPath(obj[key], arr, value, delimiter);
		} else {
			obj[key] = value;
		}
	}
	return obj;
};

module.exports = exports = setPath;

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
