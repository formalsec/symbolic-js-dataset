function merge(a, b, k) {
	if (typeof a === 'object' && typeof b === 'object')  {
		if (Array.isArray(a) && Array.isArray(b)) {
			for (k=0; k < b.length; k++) {
				a[k] = merge(a[k], b[k]);
			}
		} else {
			for (k in b) {
				a[k] = merge(a[k], b[k]);
			}
		}
		return a;
	}
	return b;
}

function dset(obj, keys, val) {
	keys.split && (keys=keys.split('.'));
	var i=0, l=keys.length, t=obj, x, k;
	while (i < l) {
		k = keys[i++];
		if (k === '__proto__' || k === 'constructor' || k === 'prototype') break;
		t = t[k] = (i === l) ? merge(t[k],val) : (typeof(x=t[k])===typeof keys) ? x : (keys[i]*0 !== 0 || !!~(''+keys[i]).indexOf('.')) ? {} : [];
	}
}

module.exports.dset = dset;
module.exports.merge = merge;

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var dst_obj = {  };
var src_obj = esl_symbolic.polluted_object(2);
module.exports(dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
