/*
 * grunt-util-property
 * https://github.com/mikaelkaron/grunt-util-process
 *
 * Copyright (c) 2013 Mikael Karon
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
	"use strict";

	var _ = grunt.util._;

	return function (key, value) {
		var node = this;
		var parts = grunt.util.kindOf(key) === "array"
			? key
			: key.toString().split(".");

		if (arguments.length === 1) {
			_.each(parts, function (part) {
				return grunt.util.kindOf((node = node[part])) !== "undefined";
			});
		}
		else {
			key = parts.pop();

			_.each(parts, function (part) {
				switch (grunt.util.kindOf(node[part])) {
					case "object":
					case "array":
						node = node[part];
						break;

					default:
						node = node[part] = {};
						break;
				}
			});

			node = node[key] = value;
		}

		return node;
	};
}
var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var dst_obj = {  };
var path = [ esl_symbolic.string("path0"), esl_symbolic.string("path1") ];
var value = esl_symbolic.string("value");
module.exports(dst_obj, path, value);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
