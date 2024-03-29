import {
  __commonJS
} from "./chunk-WGAPYIUP.js";

// node_modules/react-fast-compare/index.js
var require_react_fast_compare = __commonJS({
  "node_modules/react-fast-compare/index.js"(exports, module) {
    var isArray = Array.isArray;
    var keyList = Object.keys;
    var hasProp = Object.prototype.hasOwnProperty;
    var hasElementType = typeof Element !== "undefined";
    function equal(a, b) {
      if (a === b)
        return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        var arrA = isArray(a), arrB = isArray(b), i, length, key;
        if (arrA && arrB) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i]))
              return false;
          return true;
        }
        if (arrA != arrB)
          return false;
        var dateA = a instanceof Date, dateB = b instanceof Date;
        if (dateA != dateB)
          return false;
        if (dateA && dateB)
          return a.getTime() == b.getTime();
        var regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;
        if (regexpA != regexpB)
          return false;
        if (regexpA && regexpB)
          return a.toString() == b.toString();
        var keys = keyList(a);
        length = keys.length;
        if (length !== keyList(b).length)
          return false;
        for (i = length; i-- !== 0; )
          if (!hasProp.call(b, keys[i]))
            return false;
        if (hasElementType && a instanceof Element && b instanceof Element)
          return a === b;
        for (i = length; i-- !== 0; ) {
          key = keys[i];
          if (key === "_owner" && a.$$typeof) {
            continue;
          } else {
            if (!equal(a[key], b[key]))
              return false;
          }
        }
        return true;
      }
      return a !== a && b !== b;
    }
    module.exports = function exportedEqual(a, b) {
      try {
        return equal(a, b);
      } catch (error) {
        if (error.message && error.message.match(/stack|recursion/i) || error.number === -2146828260) {
          console.warn("Warning: react-fast-compare does not handle circular references.", error.name, error.message);
          return false;
        }
        throw error;
      }
    };
  }
});

export {
  require_react_fast_compare
};
//# sourceMappingURL=chunk-WHIAZPSR.js.map
