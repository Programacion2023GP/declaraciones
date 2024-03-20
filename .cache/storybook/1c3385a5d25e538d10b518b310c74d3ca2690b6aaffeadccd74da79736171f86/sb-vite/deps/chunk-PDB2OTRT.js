import {
  require_isArray
} from "./chunk-NXQS4TBW.js";
import {
  require_isObjectLike
} from "./chunk-EL7STE27.js";
import {
  require_baseGetTag
} from "./chunk-6THRJBBL.js";
import {
  __commonJS
} from "./chunk-WGAPYIUP.js";

// node_modules/lodash/isString.js
var require_isString = __commonJS({
  "node_modules/lodash/isString.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isArray = require_isArray();
    var isObjectLike = require_isObjectLike();
    var stringTag = "[object String]";
    function isString(value) {
      return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
    }
    module.exports = isString;
  }
});

export {
  require_isString
};
//# sourceMappingURL=chunk-PDB2OTRT.js.map
