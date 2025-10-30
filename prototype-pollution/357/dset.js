module.exports = function(obj, keys, val) {
  keys.split && (keys = keys.split('.'));
  var i = 0, l = keys.length, t = obj, x;
  for (; i < l; ++i) {
    x = t[keys[i]];
    if (i === l - 1) {
      t[keys[i]] = val;
    } else {
      t[keys[i]] = x == null ? {} : x;
    }

    t = t[keys[i]];
  }
}
