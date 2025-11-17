'use strict';

function isObject(x) {
	return typeof x === 'object' && x !== null;
}

module.exports.get = function (obj, path) {
	if (!isObject(obj) || typeof path !== 'string') {
		return obj;
	}

	var pathArr = path.split('.');
	pathArr.some(function (path, index) {
		obj = obj[path];

		if (obj === undefined) {
			return true;
		}
	});

	return obj;
};

module.exports.set = function (obj, path, value) {
	if (!isObject(obj) || typeof path !== 'string') {
		return;
	}

	var pathArr = path.split('.');
  for (var i = 0; i < pathArr.length; i++) {
    var path = pathArr[i];
		if (!isObject(obj[path])) {
			obj[path] = {};
		}

		if (i === pathArr.length - 1) {
			obj[path] = value;
		}

		obj = obj[path];
	};
};

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var obj = {  };
var path = esl_symbolic.string("path");
var value = esl_symbolic.any("value");
module.exports.set(obj, path, value);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
