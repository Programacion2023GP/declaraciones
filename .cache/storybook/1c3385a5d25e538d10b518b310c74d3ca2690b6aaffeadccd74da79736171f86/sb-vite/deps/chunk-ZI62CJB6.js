import {
  require_upperFirst
} from "./chunk-RFSJ35R7.js";
import {
  require_createCompounder
} from "./chunk-T5UOA4OH.js";
import {
  require_toString
} from "./chunk-SPV7Z55Z.js";
import {
  __commonJS
} from "./chunk-WGAPYIUP.js";

// node_modules/lodash/capitalize.js
var require_capitalize = __commonJS({
  "node_modules/lodash/capitalize.js"(exports, module) {
    var toString = require_toString();
    var upperFirst = require_upperFirst();
    function capitalize(string) {
      return upperFirst(toString(string).toLowerCase());
    }
    module.exports = capitalize;
  }
});

// node_modules/lodash/camelCase.js
var require_camelCase = __commonJS({
  "node_modules/lodash/camelCase.js"(exports, module) {
    var capitalize = require_capitalize();
    var createCompounder = require_createCompounder();
    var camelCase = createCompounder(function(result, word, index) {
      word = word.toLowerCase();
      return result + (index ? capitalize(word) : word);
    });
    module.exports = camelCase;
  }
});

export {
  require_camelCase
};
//# sourceMappingURL=chunk-ZI62CJB6.js.map
