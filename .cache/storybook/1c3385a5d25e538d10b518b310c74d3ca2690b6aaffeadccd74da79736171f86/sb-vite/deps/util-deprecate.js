import {
  __commonJS
} from "./chunk-WGAPYIUP.js";

// node_modules/util-deprecate/browser.js
var require_browser = __commonJS({
  "node_modules/util-deprecate/browser.js"(exports, module) {
    module.exports = deprecate;
    function deprecate(fn, msg) {
      if (config("noDeprecation")) {
        return fn;
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          if (config("throwDeprecation")) {
            throw new Error(msg);
          } else if (config("traceDeprecation")) {
            console.trace(msg);
          } else {
            console.warn(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      return deprecated;
    }
    function config(name) {
      try {
        if (!global.localStorage)
          return false;
      } catch (_) {
        return false;
      }
      var val = global.localStorage[name];
      if (null == val)
        return false;
      return String(val).toLowerCase() === "true";
    }
  }
});
export default require_browser();
//# sourceMappingURL=util-deprecate.js.map
