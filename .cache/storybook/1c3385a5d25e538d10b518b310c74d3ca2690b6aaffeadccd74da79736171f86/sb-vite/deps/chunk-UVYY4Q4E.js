import {
  require_createCompounder
} from "./chunk-T5UOA4OH.js";
import {
  __commonJS
} from "./chunk-WGAPYIUP.js";

// node_modules/lodash/kebabCase.js
var require_kebabCase = __commonJS({
  "node_modules/lodash/kebabCase.js"(exports, module) {
    var createCompounder = require_createCompounder();
    var kebabCase = createCompounder(function(result, word, index) {
      return result + (index ? "-" : "") + word.toLowerCase();
    });
    module.exports = kebabCase;
  }
});

export {
  require_kebabCase
};
//# sourceMappingURL=chunk-UVYY4Q4E.js.map
