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
var obj = {  };
var path = [ esl_symbolic.string("path0") ];
var value = esl_symbolic.any("value");
var delimiter = esl_symbolic.any("delimiter");
module.exports(obj, path, value, delimiter);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
