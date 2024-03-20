import {
  require_upperFirst
} from "./chunk-RFSJ35R7.js";
import {
  require_createCompounder
} from "./chunk-T5UOA4OH.js";
import {
  __commonJS
} from "./chunk-WGAPYIUP.js";

// node_modules/lodash/startCase.js
var require_startCase = __commonJS({
  "node_modules/lodash/startCase.js"(exports, module) {
    var createCompounder = require_createCompounder();
    var upperFirst = require_upperFirst();
    var startCase = createCompounder(function(result, word, index) {
      return result + (index ? " " : "") + upperFirst(word);
    });
    module.exports = startCase;
  }
});

export {
  require_startCase
};
//# sourceMappingURL=chunk-5YERRTRN.js.map
