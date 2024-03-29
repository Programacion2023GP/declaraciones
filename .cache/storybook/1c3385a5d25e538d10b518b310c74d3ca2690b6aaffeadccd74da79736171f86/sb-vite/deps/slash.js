import {
  __commonJS
} from "./chunk-WGAPYIUP.js";

// node_modules/slash/index.js
var require_slash = __commonJS({
  "node_modules/slash/index.js"(exports, module) {
    module.exports = (path) => {
      const isExtendedLengthPath = /^\\\\\?\\/.test(path);
      const hasNonAscii = /[^\u0000-\u0080]+/.test(path);
      if (isExtendedLengthPath || hasNonAscii) {
        return path;
      }
      return path.replace(/\\/g, "/");
    };
  }
});
export default require_slash();
//# sourceMappingURL=slash.js.map
