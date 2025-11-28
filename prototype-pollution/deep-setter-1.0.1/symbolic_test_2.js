/**
 * Created by daniel.irwin on 6/20/16.
 */

function arupex_deep_setter(obj, accessor, value){

    if(!obj){
        obj = {};
    }

    var keys = accessor.split('.');

    var ref = obj;

    var index = 0;

    function cleanupIndexAccessor(key) {
        return key.replace('[@', '').replace(']', '');
    }

    keys.forEach(function(key){
        var lookAhead = keys[index+1];

        key = cleanupIndexAccessor(key);

        if(typeof ref[key] === 'undefined'){
            if(lookAhead && lookAhead.indexOf('[@') > -1 && !isNaN(cleanupIndexAccessor(lookAhead))){
                ref[key] = [];
            }
            else {
                ref[key] = {};
            }
        }
        if(index === keys.length - 1 ) {
            ref[key] = value;
        }
        ref = ref[key];
        ++index;
    });

    return obj;
}



module.exports = arupex_deep_setter;

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
