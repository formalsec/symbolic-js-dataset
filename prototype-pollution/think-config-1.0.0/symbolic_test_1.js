const helper = {
  isObject: function(o) {
    return o !== null && typeof o === 'object' && !Array.isArray(o);
  }
};
/**
 * config manage
 */
class Config {
  /**
   * constructor
   * @param {config} config data
   */
  constructor(config = {}){
    this.config = config;
  }
  /**
   * get config
   * get(), get('name'), get('foo.bar.xxx')
   * @param {name} undefined|String
   */
  get(name, config){
    if(!name){
      return this.config;
    }
    config = config || this.config;
    if(name.indexOf('.') === -1){
      return config[name];
    }
    name = name.split('.');
    let length = name.length;
    name.some((item, index) => {
      config = config[item];
      if(index !== length - 1 && !helper.isObject(config)){
        config = undefined;
        return true;
      }
    });
    return config;
  }
  /**
   * set config
   * set('name', 'value'), set('foo.bar', 'value')
   */
  set(name, value){
    if(name.indexOf('.') === -1){
      this.config[name] = value;
    }
    let config = this.config;
    name = name.split('.');
    let length = name.length;
    name.forEach((item, index) => {
      if(index === length - 1){
        config[item] = value;
      }else{
        if(!helper.isObject(config[item])){
          config[item] = {};
        }
        config = config[item];
      }
    });
    return this;
  }
}

module.exports = Config;

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var dst_obj = {  };
var prop_1 = esl_symbolic.string("prop_1");
var prop_2 = esl_symbolic.string("prop_2");
var value = esl_symbolic.string("value");
var src_obj = { [prop_1] : { [prop_2] : value } };
module.exports(dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
