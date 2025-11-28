function typeOf(obj) {
	var t = typeof obj;
	if(t !== 'object') return t;

	// typeof null == 'object' so check seperately
	if(obj === null) return 'null';

	// typeof new Array|String|Number|Boolean|RegExp == 'object' so check seperately
	switch(obj.constructor) {
		case Array:		return 'array';
		case String:	return 'string';
		case Number:	return 'number';
		case Boolean:	return 'boolean';
		case RegExp:	return 'regexp';
		case Date:		return 'date';
	}
	return 'object';
};

slice = Array.prototype.slice;

module.exports = {
	clone: deepClone,
	cloneShallow: clone,
	extend: deepExtend,
	extendShallow: extend,
	update: deepUpdate,
	updateShallow: update,
	merge: deepMerge,
	mergeShallow: merge
};

function clone(val) {
	switch(typeOf(val)) {
		case 'object':
			var args = slice.call(arguments);
			args.unshift({});
			return extend.apply(null, args);
		case 'array':
			return [].concat(val);
		case 'date':
			return new Date(val.getTime());
		case 'regexp':
			return new RegExp(val);
		default:
			return val;
	}
}

function deepClone(val) {
	switch(typeOf(val)) {
		case 'object':
			var args = slice.call(arguments);
			args.unshift({});
			return deepExtend.apply(null, args);
		case 'array':
			return val.map(function(v) { return deepClone(v); });
		default:
			return clone(val);
	}
}

function extend(a, b /*, [b2..n] */) {
	slice.call(arguments, 1).forEach(function(b) {
		Object.keys(b).forEach(function(p) {
			a[p] = b[p];
		});
	});
	return a;
}

function deepExtend(a, b /*, [b2..n] */) {
	slice.call(arguments, 1).forEach(function(b) {
		Object.keys(b).forEach(function(p) {
			if(typeOf(b[p]) === 'object' && typeOf(a[p]) === 'object')
				deepExtend(a[p], b[p]);
			else
				a[p] = deepClone(b[p]);
		});
	});
	return a;
}

function update(a, b /*, [b2..n] */) {
	slice.call(arguments, 1).forEach(function(b) {
		Object.keys(b).forEach(function(p) {
			if(a.hasOwnProperty(p)) a[p] = b[p];
		});
	});
	return a;
}

function deepUpdate(a, b /*, [b2..n] */) {
	slice.call(arguments, 1).forEach(function(b) {
		var ap, bp, ta, tb;
		Object.keys(b).forEach(function(p) {
			if(a.hasOwnProperty(p)) {
				ap = a[p];
				bp = b[p];
				ta = typeOf(ap);
				tb = typeOf(bp);
				if(tb === 'object' && ta === 'object')
					deepUpdate(ap, bp);
				else if(tb === 'array' && ta === 'array') {
					ap.length = 0;
					ap.push.apply(ap, bp.map(function(v) { return deepClone(v); }));
				} else
					a[p] = deepClone(bp);
			}
		});
	});
	return a;
}

function merge(a, b /*, [b2..n] */) {
	slice.call(arguments, 1).forEach(function(b) {
		Object.keys(b).forEach(function(p) {
			if(!a.hasOwnProperty(p)) a[p] = b[p];
		});
	});
	return a;
}

function deepMerge(a, b /*, [b2..n] */) {
	slice.call(arguments, 1).forEach(function(b) {
		var ap, bp, ta, tb;
		Object.keys(b).forEach(function(p) {
			ap = a[p];
			bp = b[p];
			ta = typeOf(ap);
			tb = typeOf(bp);
			if(tb === 'object' && ta === 'object')
				deepMerge(ap, bp);
			else if(!a.hasOwnProperty(p))
				a[p] = deepClone(bp);
		});
	});
	return a;
}

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
