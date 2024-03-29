import {
  require_baseForOwn
} from "./chunk-4H4IIYYB.js";
import {
  require_baseIteratee
} from "./chunk-53KUAAGM.js";
import {
  require_baseAssignValue
} from "./chunk-UFYXYYVW.js";
import {
  __commonJS
} from "./chunk-WGAPYIUP.js";

// node_modules/lodash/mapKeys.js
var require_mapKeys = __commonJS({
  "node_modules/lodash/mapKeys.js"(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var baseForOwn = require_baseForOwn();
    var baseIteratee = require_baseIteratee();
    function mapKeys(object, iteratee) {
      var result = {};
      iteratee = baseIteratee(iteratee, 3);
      baseForOwn(object, function(value, key, object2) {
        baseAssignValue(result, iteratee(value, key, object2), value);
      });
      return result;
    }
    module.exports = mapKeys;
  }
});

export {
  require_mapKeys
};
//# sourceMappingURL=chunk-KGGBY7TL.js.map
