import {
  require_isObjectLike
} from "./chunk-EL7STE27.js";
import {
  require_baseGetTag
} from "./chunk-6THRJBBL.js";
import {
  __commonJS
} from "./chunk-WGAPYIUP.js";

// node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "node_modules/lodash/isSymbol.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module.exports = isSymbol;
  }
});

export {
  require_isSymbol
};
//# sourceMappingURL=chunk-4TA7XR3R.js.map
