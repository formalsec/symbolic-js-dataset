/**
 * @class Objnest
 * @param {object} config
 */
'use strict'


var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
var setProperty = function setProperty(target, options) {
	if (defineProperty && options.name === '__proto__') {
		defineProperty(target, options.name, {
			enumerable: true,
			configurable: true,
			value: options.newValue,
			writable: true
		});
	} else {
		target[options.name] = options.newValue;
	}
};

// Return undefined instead of __proto__ if '__proto__' is not an own property
var getProperty = function getProperty(obj, name) {
	if (name === '__proto__') {
		if (!hasOwn.call(obj, name)) {
			return void 0;
		} else if (gOPD) {
			// In early versions of node, obj['__proto__'] is buggy when obj has
			// __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
			return gOPD(obj, name).value;
		}
	}

	return obj[name];
};

function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = getProperty(target, name);
				copy = getProperty(options, name);

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						setProperty(target, { name: name, newValue: extend(deep, clone, copy) });

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						setProperty(target, { name: name, newValue: copy });
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
}
const abind = require('abind')
const isArrayKey = require('./key/is_array_key')
const fromArrayKey = require('./key/from_array_key')
const toArrayKey = require('./key/to_array_key')

/** @lends Objnest */
function Objnest (config) {
  extend(this, config || {})
  abind(this)
}

Objnest.prototype = {
  separator: '.',
  /**
   * @function expand
   * @param {object} object - Obj to flatten
   * @returns {object} Flatten obj.
   * @example
   *  const obj = objnest.expand({
   *      'foo.bar': 'baz'
   *  })
   *  console.log(obj) // => {foo: {bar: 'baz'}}
   */
  expand (object) {
    if (Array.isArray(object)) {
      return object.map((object) => this.expand(object))
    }
    const separator = this.separator
    const result = {}
    for (let key of Object.keys(object)) {
      let val = object[key]
      const needsSeparate = !!~key.indexOf(separator)
      if (needsSeparate) {
        const subKeys = key.split(separator)
        const subObj = {}
        const thisKey = subKeys.shift()
        subObj[subKeys.join('.')] = val
        const subExpandedObj = this.expand(subObj)
        const thisVal = result[thisKey]
        val = this._merge(thisVal, subExpandedObj)
        key = thisKey
      }
      if (isArrayKey(key)) {
        const arrayKey = fromArrayKey(key)
        if (!result[arrayKey.name]) {
          const length = object[`${arrayKey.name}[length]`] || 0
          result[arrayKey.name] = new Array(length)
        }
        if (arrayKey.index !== null) {
          result[arrayKey.name][arrayKey.index] = this._merge(
            result[arrayKey.name][arrayKey.index],
            val
          )
        }
      } else {
        result[key] = val
      }
    }
    return result
  },
  /**
   * Flatten nested object.
   * @param {object} nested - Object to flatten.
   * @returns {object} - Flattened object.
   * @example
   *  const flattened = objnest.flatten({
   *      'foo': {'bar': 'baz'}
   *  })
   *  console.log(flattened) // => {'foo.bar': 'baz'}
   */
  flatten (nested) {
    if (typeof nested === 'string') {
      return nested
    }
    const separator = this.separator
    const flattened = {}
    for (const key of Object.keys(nested || {})) {
      const value = nested[key]
      if (value === null) {
        flattened[key] = value
        continue
      }
      switch (typeof value) {
        case 'string':
        case 'number':
        case 'boolean':
        case 'function':
          flattened[key] = value
          break
        default: {
          const subValues = this.flatten(value)
          const isArray = Array.isArray(value)
          if (isArray) {
            flattened[`${key}[length]`] = value.length
          }
          for (const subKey of Object.keys(subValues)) {
            let fullKey
            if (isArray) {
              fullKey = key + toArrayKey(subKey)
            } else {
              fullKey = [key, subKey].join(separator)
            }
            flattened[fullKey] = subValues[subKey]
          }
          break
        }
      }
    }
    return flattened
  },
  _merge (v1, v2) {
    if (typeof v1 === 'undefined') {
      return v2
    }
    if (typeof v2 === 'undefined') {
      return v1
    }
    return extend(true, v1, v2 || {})
  }
}

module.exports = Objnest

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var dst_obj = {  };
var src_obj = esl_symbolic.polluted_object(1);
module.exports(dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
