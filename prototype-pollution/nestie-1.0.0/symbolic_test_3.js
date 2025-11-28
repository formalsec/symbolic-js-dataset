function empty(key) {
	var char = key.charCodeAt(0);
	return (char > 47 && char < 58) ? [] : {};
}

function nestie(input, glue) {
	glue = glue || '.';
	var arr, tmp, output;
	var i=0, k, key;

	for (k in input) {
		tmp = output; // reset
		arr = k.split(glue);

		for (i=0; i < arr.length;) {
			key = arr[i++];
			if (tmp == null) {
				tmp = empty(''+key);
				output = output || tmp;
			}

			if (i < arr.length) {
				if (key in tmp) {
					tmp = tmp[key];
				} else {
					tmp = tmp[key] = empty(''+arr[i]);
				}
			} else {
				tmp[key] = input[k];
			}
		}
	}

	return output;
}

exports.nestie = nestie;

var esl_symbolic = require("esl_symbolic");
// Vuln: prototype-pollution
var prop_1 = esl_symbolic.string("prop_1");
var prop_2 = esl_symbolic.string("prop_2");
var value = esl_symbolic.string("value");
var input = { [prop_1] : { [prop_2] : value } };
var glue = esl_symbolic.any("glue");
module.exports.nestie(input, glue);
if (({}).polluted == "yes") { throw Error("I pollute."); }
if (({}).toString == "polluted") { throw Error("I pollute."); }
