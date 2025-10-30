'use strict';

/*
 * Helper for extending, cloning, ... objects,
 * extends always even if null or undefined
 */

module.exports = {
    extend: extend,
    isObject: isObject,
    isEmpty: isEmpty,
    clone: cloneObj,
    copy: cloneObj,
    getValue: getObjValue,
    deepGet: getObjValue,
    setValue: setObjValue,
    deepSet: setObjValue,
    toArray: toArray,
    fromArray: fromArray,
    dateStringsToDates: dateStringsToDates,
    update: update
};


function cloneObj(obj){
    var newObj = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};
    for(var propName in obj) {
        if(typeof obj[propName] === 'object'){
            newObj[propName]=cloneObj(obj[propName]);
        }
        else {
            newObj[propName]=obj[propName];
        }
    }
    return newObj;
}

function isEmpty(obj){
    for(var propName in obj) {
        return false;
    }
    return true;
}

function isObject(value){
    return Object.prototype.toString.call(value)==='[object Object]';
}

function toArray(obj, fields, transfornFnc){
    if(arguments.length===2 && typeof arguments[1] === 'function'){
        transfornFnc = arguments[1];
        fields = null;
    }

    if(!isObject(obj)) throw new Error('Wrong arguments');
    var index, array = [];
    transfornFnc = typeof transfornFnc === 'function' ? transfornFnc : function(key, value){ return value; };

    if(Array.isArray(fields)) for(var i=0;i<fields.length;i++){
        array[i] = transfornFnc(key, getObjValue(obj, fields[i]));
    }
    else for(var key in obj){
        if(obj.hasOwnProperty(key)){
            array.push( transfornFnc(key, obj[key]) );
        }
    }

    return array;
}

function fromArray(array, transfornFnc){
    if(!Array.isArray(array)) throw new Error('Wrong arguments');
    var obj = {};
    transfornFnc = typeof transfornFnc === 'function' ? transfornFnc : function(element, i){ return { key:i, value:element }; };

    var keyValue = {};
    for(var i=0;i<array.length;i++) {
        keyValue = transfornFnc(array[i],i);
        obj[ keyValue.key ] = keyValue.value;
    }

    return obj;
}

function extend() { // exend([deep], target, ext1, ext2, ... , extx)
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if(typeof target === 'boolean') {
        deep = target;
        target = arguments[1] || {};
        // skip the boolean and the target
        i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if(typeof target !== 'object' && typeof target !== 'function') {
        target = {};
    }

    for(;i < length; i++) {
        // Only deal with non-null/undefined values
        if((options = arguments[i]) !== null ) {
            // Extend the base object
            for(name in options) {
                src = target[ name ];
                copy = options[ name ];

                // Prevent never-ending loop
                if(target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if(deep && copy && (isObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                    if(copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];

                    }
                    else {
                        clone = src && isObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[name] = extend(deep, clone, copy);

                }
                // copy all include undefined props - helpful in query builder // Don't bring in undefined values
                else { // if (copy !== undefined){
                    target[name] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
}

/**
 * Define cascading props in objects in namespace separated by dot,
 * if props are on lower level, it will create empty object
 * @param {Object} parent base object where you want add props
 * @param {String} namespace dot separated
 * @param {Object} value value to add to object prop
 * @param {String} mode if "push", it will add value to array
 * @returns {Object}  parent object after properties are added
 */
function setObjValue(parent, namespace, value, mode) {
    // if(typeof value==='string') value = value.replace(/(\r\n|\r|\n)\s*$/, ''); // replace line endings and white spaces
    var parts = namespace.split('.');
    var current = parent;
    if(namespace==='this') {
        if(mode==='push') parent.push(value);
        else parent = value.toString();
    }
    else {
        for(var i=0; i<parts.length; i++) {
            if(i >= parts.length-1) {
                if(mode==='push') current[parts[i]].push(value);
                else current[parts[i]] = value;
            }
            else current[parts[i]] = current[parts[i]] || {};
            current = current[parts[i]];
        }
    }
    return parent;
}

function getObjValue(parent, namespace) {
    if((!parent && parent!==false) || typeof parent === 'function') return undefined;
    if(namespace==='this') return parent;

    var parts = namespace.split('.');
    var current = parent;

    for(var i=0; i<parts.length; i++) {
        if(!current[parts[i]] && current[parts[i]]!==false) return undefined;
        else current = current[parts[i]];
    }

    // function as value is not allowed
    if(typeof current === 'function') return undefined;
    return current;
}


// helper - auto parse dates
var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;
function dateStringsToDates(input) {
    var value, match;

    // fix: exclude "2014" format, it may be number as string, only year is not allowed
    if(typeof input === 'string' && input.match(/^\d{4}$/)) return input;

    // try to parse if input is string
    if(typeof input === 'string' && (match = input.match(regexIso8601))) {
        var milliseconds = Date.parse(match[0]);
        if (!isNaN(milliseconds)) {
            input = new Date(milliseconds);
        }
        return input;
    }

    // Ignore things that aren't objects
    else if(typeof input !== 'object') return input;

    for(var key in input){
        value = input[key];

        // fix: exclude "2014" format, it may be number as string, only year is not allowed
        if(typeof value === 'string' && value.match(/^\d{4}$/)) continue;

        // Check for string properties which look like dates.
        if(typeof value === 'string' && (match = value.match(regexIso8601))) {
            var milliseconds = Date.parse(match[0]);
            if (!isNaN(milliseconds)) {
                input[key] = new Date(milliseconds);
            }
        }
        else if (typeof value === 'object') {
            // Recurse into object
            dateStringsToDates(value);
        }
    }

    return input;
}

/*
 * implemented: $set, $inc, $max, $min
 */
function update(obj, expression){
    if(isObject(expression)) for(var key in expression){
        if(isObject(expression[key])){

            if(key==='$set') obj = update(obj, expression[key]);

            else if(key==='$inc') for(var prop in expression[key]){
                if(typeof expression[key][prop] === 'number'){
                    var orig = getObjValue(obj, prop);
                    if(orig === undefined) obj = setObjValue(obj, prop, expression[key][prop]);
                    else if(typeof orig === 'number') obj = setObjValue(obj, prop, orig+expression[key][prop]);
                }
            }

            else if(key==='$max' || key==='$min') for(var prop in expression[key]){
                if(typeof expression[key][prop] === 'number'){
                    var orig = getObjValue(obj, prop);
                    if(key==='$max' && orig < expression[key][prop]) obj = setObjValue(obj, prop, expression[key][prop]);
                    else if(key==='$min' && orig > expression[key][prop]) obj = setObjValue(obj, prop, expression[key][prop]);
                }

            }

            else if(key==='$pull' || key==='$pullAll') for(var prop in expression[key]){
                var orig = getObjValue(obj, prop), value = expression[key][prop];
                if(Array.isArray(orig)){
                    if(!Array.isArray(value)) value = [value];
                    for(var i=0;i<value.length;i++){
                        var index = orig.indexOf( value[i] );
                        if(index!==-1) orig.splice(index, 1);
                    }
                    obj = setObjValue(obj, prop, orig);
                }
            }

            else if(key==='$push') for(var prop in expression[key]){
                var orig = getObjValue(obj, prop), value = expression[key][prop];
                if(value.$each) value = value.$each;
                if(Array.isArray(orig)){
                    if(!Array.isArray(value)) value = [value];
                    for(var i=0;i<value.length;i++){
                        orig.push(value[i]);
                    }
                    obj = setObjValue(obj, prop, orig);
                }
            }

            else if(key[0]==='$') continue; // skip not recognized keys

            else obj = setObjValue(obj, key, expression[key]); // key is simple property
        }

        // if expression.$set, ignore data properties outside it
        else if(!expression.$set) obj = setObjValue(obj, key, expression[key]);
    }
    return obj;
}
