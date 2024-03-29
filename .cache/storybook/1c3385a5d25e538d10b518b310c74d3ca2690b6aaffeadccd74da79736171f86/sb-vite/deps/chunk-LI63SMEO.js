import {
  __commonJS
} from "./chunk-WGAPYIUP.js";

// node_modules/@base2/pretty-print-object/dist/index.js
var require_dist = __commonJS({
  "node_modules/@base2/pretty-print-object/dist/index.js"(exports) {
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __spreadArrays = exports && exports.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var seen = [];
    function isObj(value) {
      var type = typeof value;
      return value !== null && (type === "object" || type === "function");
    }
    function isRegexp(value) {
      return Object.prototype.toString.call(value) === "[object RegExp]";
    }
    function getOwnEnumPropSymbols(object) {
      return Object.getOwnPropertySymbols(object).filter(function(keySymbol) {
        return Object.prototype.propertyIsEnumerable.call(object, keySymbol);
      });
    }
    function prettyPrint(input, options, pad) {
      if (pad === void 0) {
        pad = "";
      }
      var defaultOptions = {
        indent: "	",
        singleQuotes: true
      };
      var combinedOptions = __assign(__assign({}, defaultOptions), options);
      var tokens;
      if (combinedOptions.inlineCharacterLimit === void 0) {
        tokens = {
          newLine: "\n",
          newLineOrSpace: "\n",
          pad,
          indent: pad + combinedOptions.indent
        };
      } else {
        tokens = {
          newLine: "@@__PRETTY_PRINT_NEW_LINE__@@",
          newLineOrSpace: "@@__PRETTY_PRINT_NEW_LINE_OR_SPACE__@@",
          pad: "@@__PRETTY_PRINT_PAD__@@",
          indent: "@@__PRETTY_PRINT_INDENT__@@"
        };
      }
      var expandWhiteSpace = function(string) {
        if (combinedOptions.inlineCharacterLimit === void 0) {
          return string;
        }
        var oneLined = string.replace(new RegExp(tokens.newLine, "g"), "").replace(new RegExp(tokens.newLineOrSpace, "g"), " ").replace(new RegExp(tokens.pad + "|" + tokens.indent, "g"), "");
        if (oneLined.length <= combinedOptions.inlineCharacterLimit) {
          return oneLined;
        }
        return string.replace(new RegExp(tokens.newLine + "|" + tokens.newLineOrSpace, "g"), "\n").replace(new RegExp(tokens.pad, "g"), pad).replace(new RegExp(tokens.indent, "g"), pad + combinedOptions.indent);
      };
      if (seen.indexOf(input) !== -1) {
        return '"[Circular]"';
      }
      if (input === null || input === void 0 || typeof input === "number" || typeof input === "boolean" || typeof input === "function" || typeof input === "symbol" || isRegexp(input)) {
        return String(input);
      }
      if (input instanceof Date) {
        return "new Date('" + input.toISOString() + "')";
      }
      if (Array.isArray(input)) {
        if (input.length === 0) {
          return "[]";
        }
        seen.push(input);
        var ret = "[" + tokens.newLine + input.map(function(el, i) {
          var eol = input.length - 1 === i ? tokens.newLine : "," + tokens.newLineOrSpace;
          var value = prettyPrint(el, combinedOptions, pad + combinedOptions.indent);
          if (combinedOptions.transform) {
            value = combinedOptions.transform(input, i, value);
          }
          return tokens.indent + value + eol;
        }).join("") + tokens.pad + "]";
        seen.pop();
        return expandWhiteSpace(ret);
      }
      if (isObj(input)) {
        var objKeys_1 = __spreadArrays(Object.keys(input), getOwnEnumPropSymbols(input));
        if (combinedOptions.filter) {
          objKeys_1 = objKeys_1.filter(function(el) {
            return combinedOptions.filter && combinedOptions.filter(input, el);
          });
        }
        if (objKeys_1.length === 0) {
          return "{}";
        }
        seen.push(input);
        var ret = "{" + tokens.newLine + objKeys_1.map(function(el, i) {
          var eol = objKeys_1.length - 1 === i ? tokens.newLine : "," + tokens.newLineOrSpace;
          var isSymbol = typeof el === "symbol";
          var isClassic = !isSymbol && /^[a-z$_][a-z$_0-9]*$/i.test(el.toString());
          var key = isSymbol || isClassic ? el : prettyPrint(el, combinedOptions);
          var value = prettyPrint(input[el], combinedOptions, pad + combinedOptions.indent);
          if (combinedOptions.transform) {
            value = combinedOptions.transform(input, el, value);
          }
          return tokens.indent + String(key) + ": " + value + eol;
        }).join("") + tokens.pad + "}";
        seen.pop();
        return expandWhiteSpace(ret);
      }
      input = String(input).replace(/[\r\n]/g, function(x) {
        return x === "\n" ? "\\n" : "\\r";
      });
      if (!combinedOptions.singleQuotes) {
        input = input.replace(/"/g, '\\"');
        return '"' + input + '"';
      }
      input = input.replace(/\\?'/g, "\\'");
      return "'" + input + "'";
    }
    exports.prettyPrint = prettyPrint;
  }
});

export {
  require_dist
};
//# sourceMappingURL=chunk-LI63SMEO.js.map
