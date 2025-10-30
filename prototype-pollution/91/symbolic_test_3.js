function isPlainObject(value) {
  return (!!value && typeof value === 'object' &&
    value.constructor === Object);
}

function hasOwn(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var _hasDontEnumBug,
  _dontEnums;

function checkDontEnum() {
  _dontEnums = [
    'toString',
    'toLocaleString',
    'valueOf',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'constructor'
  ];

  _hasDontEnumBug = true;

  for (var key in { 'toString': null }) {
    _hasDontEnumBug = false;
  }
}

/**
 * Similar to Array/forEach but works over object properties and fixes Don't
 * Enum bug on IE.
 * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
 */
function forIn(obj, fn, thisObj) {
  var key, i = 0;
  // no need to check if argument is a real object that way we can use
  // it for arrays, functions, date, etc.

  //post-pone check till needed
  if (_hasDontEnumBug == null) checkDontEnum();

  for (key in obj) {
    if (exec(fn, obj, key, thisObj) === false) {
      break;
    }
  }


  if (_hasDontEnumBug) {
    var ctor = obj.constructor,
      isProto = !!ctor && obj === ctor.prototype;

    while (key = _dontEnums[i++]) {
      // For constructor, if it is a prototype object the constructor
      // is always non-enumerable unless defined otherwise (and
      // enumerated above).  For non-prototype objects, it will have
      // to be defined on this object, since it cannot be defined on
      // any prototype objects.
      //
      // For other [[DontEnum]] properties, check if the value is
      // different than Object prototype value.
      if (
        (key !== 'constructor' ||
          (!isProto && hasOwn(obj, key))) &&
        obj[key] !== Object.prototype[key]
      ) {
        if (exec(fn, obj, key, thisObj) === false) {
          break;
        }
      }
    }
  }
}

function exec(fn, obj, key, thisObj) {
  return fn.call(thisObj, obj[key], key, obj);
}



function forOwn(obj, fn, thisObj) {
  forIn(obj, function(val, key) {
    if (hasOwn(obj, key)) {
      return fn.call(thisObj, obj[key], key, obj);
    }
  });
}


/**
 * Deeply copy missing properties in the target from the defaults.
 */
function deepFillIn(target, defaults) {
  var i = 0,
    n = arguments.length,
    obj;

  while (++i < n) {
    obj = arguments[i];
    if (obj) {
      // jshint loopfunc: true
      forOwn(obj, function(newValue, key) {
        var curValue = target[key];
        if (curValue == null) {
          target[key] = newValue;
        } else if (isPlainObject(curValue) &&
          isPlainObject(newValue)) {
          deepFillIn(curValue, newValue);
        }
      });
    }
  }

  return target;
}

// return deepFillIn;
module.exports = deepFillIn

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var target = {  };
var defaults = esl_symbolic.any("defaults");
module.exports(target, defaults);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
