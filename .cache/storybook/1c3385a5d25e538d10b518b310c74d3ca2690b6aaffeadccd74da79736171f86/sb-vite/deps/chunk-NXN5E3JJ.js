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

// node_modules/lodash/mapValues.js
var require_mapValues = __commonJS({
  "node_modules/lodash/mapValues.js"(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var baseForOwn = require_baseForOwn();
    var baseIteratee = require_baseIteratee();
    function mapValues(object, iteratee) {
      var result = {};
      iteratee = baseIteratee(iteratee, 3);
      baseForOwn(object, function(value, key, object2) {
        baseAssignValue(result, key, iteratee(value, key, object2));
      });
      return result;
    }
    module.exports = mapValues;
  }
});

export {
  require_mapValues
};
//# sourceMappingURL=chunk-NXN5E3JJ.js.map
