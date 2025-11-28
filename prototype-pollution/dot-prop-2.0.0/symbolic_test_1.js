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
var dst_obj = {  };
var prop_1 = esl_symbolic.string("prop_1");
var prop_2 = esl_symbolic.string("prop_2");
var value = esl_symbolic.string("value");
var src_obj = { [prop_1] : { [prop_2] : value } };
module.exports(dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
