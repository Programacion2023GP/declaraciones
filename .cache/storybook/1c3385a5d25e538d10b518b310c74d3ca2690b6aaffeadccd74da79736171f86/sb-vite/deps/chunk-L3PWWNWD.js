import {
  require_baseAssignValue
} from "./chunk-UFYXYYVW.js";
import {
  require_eq
} from "./chunk-V42KKRHA.js";
import {
  __commonJS
} from "./chunk-WGAPYIUP.js";

// node_modules/lodash/_assignValue.js
var require_assignValue = __commonJS({
  "node_modules/lodash/_assignValue.js"(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var eq = require_eq();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }
    module.exports = assignValue;
  }
});

export {
  require_assignValue
};
//# sourceMappingURL=chunk-L3PWWNWD.js.map
