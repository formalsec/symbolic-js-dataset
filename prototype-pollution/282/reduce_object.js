// Public API
module.exports = reduceObject;

function recursiveMerge(target, source) {
  if (Array.isArray(target) && Array.isArray(source)) {
    return target.concat(source);
  } else if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (
        Object.prototype.hasOwnProperty.call(source, key)
      ) {
        target[key] = recursiveMerge(target[key], source[key]);
      }
    }

    return target;
  }
  return source;
}

function isObject(value) {
  return value !== null && typeof value === "object";
}

function reduceObject(target, source) {
  // clone exposed properties
  Object.keys(source).forEach((key) => {
    target[key] = recursiveMerge(target[key], source[key]);
  });

  return target;
}
