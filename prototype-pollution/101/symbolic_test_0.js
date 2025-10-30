module.exports = function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		tmp = {};
		for (k in x) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=new Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') return new Set(x);
	if (str === '[object Date]') return new Date(+x);
	if (str === '[object Map]') return new Map(x);

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var deep = esl_symbolic.boolean("deep");
var dst_obj = {  };
var src_obj = esl_symbolic.polluted_object(2);
module.exports(deep, dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
