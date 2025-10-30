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
var deep = esl_symbolic.boolean("deep");
var dst_obj = {  };
var src_obj = esl_symbolic.polluted_object(2);
module.exports(deep, dst_obj, src_obj);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
