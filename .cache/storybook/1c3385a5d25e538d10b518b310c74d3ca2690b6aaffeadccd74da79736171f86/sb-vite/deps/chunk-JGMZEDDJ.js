import {
  require_isObject
} from "./chunk-HXAZB23J.js";
import {
  require_baseGetTag
} from "./chunk-6THRJBBL.js";
import {
  __commonJS
} from "./chunk-WGAPYIUP.js";

// node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "node_modules/lodash/isFunction.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObject = require_isObject();
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module.exports = isFunction;
  }
});

export {
  require_isFunction
};
//# sourceMappingURL=chunk-JGMZEDDJ.js.map
