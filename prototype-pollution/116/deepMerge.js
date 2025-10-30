"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

function deepMerge(target, source) {
    if (source === undefined || source === null)
        return target;
    for (const key of Object.keys(source)) {
        if (source[key] === undefined)
            continue;
        if (target[key] && isObject(source[key])) {
            deepMerge(target[key], source[key]);
        }
        else {
            target[key] = source[key];
        }
    }
    return target;
}
module.exports = deepMerge;
//# sourceMappingURL=deepMerge.js.map
