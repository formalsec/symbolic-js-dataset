/* putil-merge
 ------------------------
 (c) 2017-present Panates
 This file may be freely distributed under the MIT license.
 */

const isObject = (item) =>
    typeof item === 'object' && !Array.isArray(item);

/**
 *
 * @param {Object} target
 * @param {Object} source
 * @param {Object} options
 * @param {boolean} [options.deep]
 * @param {boolean} [options.clone]
 * @param {boolean} [options.descriptor]
 * @param {Function} [options.filter]
 * @param {Function|Boolean} [options.arrayMerge]
 * @return {Object}
 */
function merge(target, source, options = {}) {
  if (!isObject(target))
    throw new TypeError('Property "target" requires object type');
  if (!isObject(source))
    throw new TypeError('Property "source" requires object type');

  if (source === target) return target;
  for (const key of Object.getOwnPropertyNames(source)) {
    if (options.filter && !options.filter(source, key))
      continue;

    const src = Object.getOwnPropertyDescriptor(source, key);
    if (options.descriptor) {
      if (src.get || src.set || typeof src.value === 'function') {
        Object.defineProperty(target, key, src);
        continue;
      }
    } else if (typeof src.value === 'function')
      continue;

    let srcVal = src.value;
    let trgVal = target[key];
    if (isObject(srcVal)) {
      if (options.deep) {
        if (!isObject(trgVal))
          trgVal = target[key] = {};
        merge(trgVal, srcVal, options);
        continue;
      }
      if (options.clone)
        srcVal = merge({}, srcVal, options);
    } else if (Array.isArray(srcVal)) {
      if (options.arrayMerge && Array.isArray(trgVal)) {
        if (typeof options.arrayMerge === 'function')
          srcVal = options.arrayMerge(trgVal, srcVal);
        else
          srcVal = merge.arrayCombine(trgVal, srcVal);
      } else if (options.clone)
        srcVal = srcVal.slice();
    }

    if (options.descriptor) {
      const src = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, {
        configurable: src.configurable,
        enumerable: src.enumerable,
        writable: src.writable,
        value: srcVal
      });
    } else
      target[key] = srcVal;
  }
  return target;
}

merge.all = function all(objects, options = {}) {
  const target = objects[0];
  for (const [i, o] of objects.entries()) {
    if (i > 0)
      merge(target, o, options);
  }
  return target;
};

merge.arrayCombine = function(target, source) {
  return target.concat(source.filter((v) => !target.includes(v)));
};

module.exports = merge;


var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var target = {  };
var source =
  [ esl_symbolic.string("source0"), esl_symbolic.string("source1") ];
var options =
  { filter: esl_symbolic.any("filter")
  , descriptor: esl_symbolic.any("descriptor")
  , deep: esl_symbolic.any("deep")
  , clone: esl_symbolic.any("clone")
  , arrayMerge: esl_symbolic.any("arrayMerge") };
var ret_new_module_exports = new module.exports(target, source, options);
var objects = [ esl_symbolic.string("objects0") ];
var options = [ esl_symbolic.string("options0") ];
ret_new_module_exports.all(objects, options);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
