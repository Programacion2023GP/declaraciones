import {
  _assertThisInitialized,
  _inheritsLoose,
  _setPrototypeOf
} from "./chunk-TL45JYLV.js";
import {
  _extends,
  init_extends
} from "./chunk-ODJQBEI6.js";

// node_modules/polished/dist/polished.esm.js
init_extends();

// node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}

// node_modules/@babel/runtime/helpers/esm/isNativeFunction.js
function _isNativeFunction(fn) {
  try {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  } catch (e) {
    return typeof fn === "function";
  }
}

// node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}

// node_modules/@babel/runtime/helpers/esm/construct.js
function _construct(t, e, r) {
  if (_isNativeReflectConstruct())
    return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && _setPrototypeOf(p, r.prototype), p;
}

// node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2))
      return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2))
        return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}

// node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteralLoose.js
function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  strings.raw = raw;
  return strings;
}

// node_modules/polished/dist/polished.esm.js
function last() {
  var _ref;
  return _ref = arguments.length - 1, _ref < 0 || arguments.length <= _ref ? void 0 : arguments[_ref];
}
function negation(a) {
  return -a;
}
function addition(a, b) {
  return a + b;
}
function subtraction(a, b) {
  return a - b;
}
function multiplication(a, b) {
  return a * b;
}
function division(a, b) {
  return a / b;
}
function max() {
  return Math.max.apply(Math, arguments);
}
function min() {
  return Math.min.apply(Math, arguments);
}
function comma() {
  return Array.of.apply(Array, arguments);
}
var defaultSymbols = {
  symbols: {
    "*": {
      infix: {
        symbol: "*",
        f: multiplication,
        notation: "infix",
        precedence: 4,
        rightToLeft: 0,
        argCount: 2
      },
      symbol: "*",
      regSymbol: "\\*"
    },
    "/": {
      infix: {
        symbol: "/",
        f: division,
        notation: "infix",
        precedence: 4,
        rightToLeft: 0,
        argCount: 2
      },
      symbol: "/",
      regSymbol: "/"
    },
    "+": {
      infix: {
        symbol: "+",
        f: addition,
        notation: "infix",
        precedence: 2,
        rightToLeft: 0,
        argCount: 2
      },
      prefix: {
        symbol: "+",
        f: last,
        notation: "prefix",
        precedence: 3,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: "+",
      regSymbol: "\\+"
    },
    "-": {
      infix: {
        symbol: "-",
        f: subtraction,
        notation: "infix",
        precedence: 2,
        rightToLeft: 0,
        argCount: 2
      },
      prefix: {
        symbol: "-",
        f: negation,
        notation: "prefix",
        precedence: 3,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: "-",
      regSymbol: "-"
    },
    ",": {
      infix: {
        symbol: ",",
        f: comma,
        notation: "infix",
        precedence: 1,
        rightToLeft: 0,
        argCount: 2
      },
      symbol: ",",
      regSymbol: ","
    },
    "(": {
      prefix: {
        symbol: "(",
        f: last,
        notation: "prefix",
        precedence: 0,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: "(",
      regSymbol: "\\("
    },
    ")": {
      postfix: {
        symbol: ")",
        f: void 0,
        notation: "postfix",
        precedence: 0,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: ")",
      regSymbol: "\\)"
    },
    min: {
      func: {
        symbol: "min",
        f: min,
        notation: "func",
        precedence: 0,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: "min",
      regSymbol: "min\\b"
    },
    max: {
      func: {
        symbol: "max",
        f: max,
        notation: "func",
        precedence: 0,
        rightToLeft: 0,
        argCount: 1
      },
      symbol: "max",
      regSymbol: "max\\b"
    }
  }
};
var defaultSymbolMap = defaultSymbols;
var ERRORS = {
  "1": "Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).\n\n",
  "2": "Passed invalid arguments to hsla, please pass multiple numbers e.g. hsla(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).\n\n",
  "3": "Passed an incorrect argument to a color function, please pass a string representation of a color.\n\n",
  "4": "Couldn't generate valid rgb string from %s, it returned %s.\n\n",
  "5": "Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.\n\n",
  "6": "Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).\n\n",
  "7": "Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).\n\n",
  "8": "Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.\n\n",
  "9": "Please provide a number of steps to the modularScale helper.\n\n",
  "10": "Please pass a number or one of the predefined scales to the modularScale helper as the ratio.\n\n",
  "11": 'Invalid value passed as base to modularScale, expected number or em string but got "%s"\n\n',
  "12": 'Expected a string ending in "px" or a number passed as the first argument to %s(), got "%s" instead.\n\n',
  "13": 'Expected a string ending in "px" or a number passed as the second argument to %s(), got "%s" instead.\n\n',
  "14": 'Passed invalid pixel value ("%s") to %s(), please pass a value like "12px" or 12.\n\n',
  "15": 'Passed invalid base value ("%s") to %s(), please pass a value like "12px" or 12.\n\n',
  "16": "You must provide a template to this method.\n\n",
  "17": "You passed an unsupported selector state to this method.\n\n",
  "18": "minScreen and maxScreen must be provided as stringified numbers with the same units.\n\n",
  "19": "fromSize and toSize must be provided as stringified numbers with the same units.\n\n",
  "20": "expects either an array of objects or a single object with the properties prop, fromSize, and toSize.\n\n",
  "21": "expects the objects in the first argument array to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
  "22": "expects the first argument object to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
  "23": "fontFace expects a name of a font-family.\n\n",
  "24": "fontFace expects either the path to the font file(s) or a name of a local copy.\n\n",
  "25": "fontFace expects localFonts to be an array.\n\n",
  "26": "fontFace expects fileFormats to be an array.\n\n",
  "27": "radialGradient requries at least 2 color-stops to properly render.\n\n",
  "28": "Please supply a filename to retinaImage() as the first argument.\n\n",
  "29": "Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.\n\n",
  "30": "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
  "31": "The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation\n\n",
  "32": "To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')\n\n",
  "33": "The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation\n\n",
  "34": "borderRadius expects a radius value as a string or number as the second argument.\n\n",
  "35": 'borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.\n\n',
  "36": "Property must be a string value.\n\n",
  "37": "Syntax Error at %s.\n\n",
  "38": "Formula contains a function that needs parentheses at %s.\n\n",
  "39": "Formula is missing closing parenthesis at %s.\n\n",
  "40": "Formula has too many closing parentheses at %s.\n\n",
  "41": "All values in a formula must have the same unit or be unitless.\n\n",
  "42": "Please provide a number of steps to the modularScale helper.\n\n",
  "43": "Please pass a number or one of the predefined scales to the modularScale helper as the ratio.\n\n",
  "44": "Invalid value passed as base to modularScale, expected number or em/rem string but got %s.\n\n",
  "45": "Passed invalid argument to hslToColorString, please pass a HslColor or HslaColor object.\n\n",
  "46": "Passed invalid argument to rgbToColorString, please pass a RgbColor or RgbaColor object.\n\n",
  "47": "minScreen and maxScreen must be provided as stringified numbers with the same units.\n\n",
  "48": "fromSize and toSize must be provided as stringified numbers with the same units.\n\n",
  "49": "Expects either an array of objects or a single object with the properties prop, fromSize, and toSize.\n\n",
  "50": "Expects the objects in the first argument array to have the properties prop, fromSize, and toSize.\n\n",
  "51": "Expects the first argument object to have the properties prop, fromSize, and toSize.\n\n",
  "52": "fontFace expects either the path to the font file(s) or a name of a local copy.\n\n",
  "53": "fontFace expects localFonts to be an array.\n\n",
  "54": "fontFace expects fileFormats to be an array.\n\n",
  "55": "fontFace expects a name of a font-family.\n\n",
  "56": "linearGradient requries at least 2 color-stops to properly render.\n\n",
  "57": "radialGradient requries at least 2 color-stops to properly render.\n\n",
  "58": "Please supply a filename to retinaImage() as the first argument.\n\n",
  "59": "Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.\n\n",
  "60": "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
  "61": "Property must be a string value.\n\n",
  "62": "borderRadius expects a radius value as a string or number as the second argument.\n\n",
  "63": 'borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.\n\n',
  "64": "The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation.\n\n",
  "65": "To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s').\n\n",
  "66": "The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation.\n\n",
  "67": "You must provide a template to this method.\n\n",
  "68": "You passed an unsupported selector state to this method.\n\n",
  "69": 'Expected a string ending in "px" or a number passed as the first argument to %s(), got %s instead.\n\n',
  "70": 'Expected a string ending in "px" or a number passed as the second argument to %s(), got %s instead.\n\n',
  "71": 'Passed invalid pixel value %s to %s(), please pass a value like "12px" or 12.\n\n',
  "72": 'Passed invalid base value %s to %s(), please pass a value like "12px" or 12.\n\n',
  "73": "Please provide a valid CSS variable.\n\n",
  "74": "CSS variable not found and no default was provided.\n\n",
  "75": "important requires a valid style object, got a %s instead.\n\n",
  "76": "fromSize and toSize must be provided as stringified numbers with the same units as minScreen and maxScreen.\n\n",
  "77": 'remToPx expects a value in "rem" but you provided it in "%s".\n\n',
  "78": 'base must be set in "px" or "%" but you set it in "%s".\n'
};
function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var a = args[0];
  var b = [];
  var c;
  for (c = 1; c < args.length; c += 1) {
    b.push(args[c]);
  }
  b.forEach(function(d) {
    a = a.replace(/%[a-z]/, d);
  });
  return a;
}
var PolishedError = function(_Error) {
  _inheritsLoose(PolishedError2, _Error);
  function PolishedError2(code) {
    var _this;
    if (false) {
      _this = _Error.call(this, "An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/errors.md#" + code + " for more information.") || this;
    } else {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      _this = _Error.call(this, format.apply(void 0, [ERRORS[code]].concat(args))) || this;
    }
    return _assertThisInitialized(_this);
  }
  return PolishedError2;
}(_wrapNativeSuper(Error));
var unitRegExp = /((?!\w)a|na|hc|mc|dg|me[r]?|xe|ni(?![a-zA-Z])|mm|cp|tp|xp|q(?!s)|hv|xamv|nimv|wv|sm|s(?!\D|$)|ged|darg?|nrut)/g;
function mergeSymbolMaps(additionalSymbols) {
  var symbolMap = {};
  symbolMap.symbols = additionalSymbols ? _extends({}, defaultSymbolMap.symbols, additionalSymbols.symbols) : _extends({}, defaultSymbolMap.symbols);
  return symbolMap;
}
function exec(operators, values) {
  var _ref;
  var op = operators.pop();
  values.push(op.f.apply(op, (_ref = []).concat.apply(_ref, values.splice(-op.argCount))));
  return op.precedence;
}
function calculate(expression, additionalSymbols) {
  var symbolMap = mergeSymbolMaps(additionalSymbols);
  var match;
  var operators = [symbolMap.symbols["("].prefix];
  var values = [];
  var pattern = new RegExp(
    // Pattern for numbers
    "\\d+(?:\\.\\d+)?|" + // ...and patterns for individual operators/function names
    Object.keys(symbolMap.symbols).map(function(key) {
      return symbolMap.symbols[key];
    }).sort(function(a, b) {
      return b.symbol.length - a.symbol.length;
    }).map(function(val) {
      return val.regSymbol;
    }).join("|") + "|(\\S)",
    "g"
  );
  pattern.lastIndex = 0;
  var afterValue = false;
  do {
    match = pattern.exec(expression);
    var _ref2 = match || [")", void 0], token = _ref2[0], bad = _ref2[1];
    var notNumber = symbolMap.symbols[token];
    var notNewValue = notNumber && !notNumber.prefix && !notNumber.func;
    var notAfterValue = !notNumber || !notNumber.postfix && !notNumber.infix;
    if (bad || (afterValue ? notAfterValue : notNewValue)) {
      throw new PolishedError(37, match ? match.index : expression.length, expression);
    }
    if (afterValue) {
      var curr = notNumber.postfix || notNumber.infix;
      do {
        var prev = operators[operators.length - 1];
        if ((curr.precedence - prev.precedence || prev.rightToLeft) > 0)
          break;
      } while (exec(operators, values));
      afterValue = curr.notation === "postfix";
      if (curr.symbol !== ")") {
        operators.push(curr);
        if (afterValue)
          exec(operators, values);
      }
    } else if (notNumber) {
      operators.push(notNumber.prefix || notNumber.func);
      if (notNumber.func) {
        match = pattern.exec(expression);
        if (!match || match[0] !== "(") {
          throw new PolishedError(38, match ? match.index : expression.length, expression);
        }
      }
    } else {
      values.push(+token);
      afterValue = true;
    }
  } while (match && operators.length);
  if (operators.length) {
    throw new PolishedError(39, match ? match.index : expression.length, expression);
  } else if (match) {
    throw new PolishedError(40, match ? match.index : expression.length, expression);
  } else {
    return values.pop();
  }
}
function reverseString(str) {
  return str.split("").reverse().join("");
}
function math(formula, additionalSymbols) {
  var reversedFormula = reverseString(formula);
  var formulaMatch = reversedFormula.match(unitRegExp);
  if (formulaMatch && !formulaMatch.every(function(unit) {
    return unit === formulaMatch[0];
  })) {
    throw new PolishedError(41);
  }
  var cleanFormula = reverseString(reversedFormula.replace(unitRegExp, ""));
  return "" + calculate(cleanFormula, additionalSymbols) + (formulaMatch ? reverseString(formulaMatch[0]) : "");
}
var cssVariableRegex = /--[\S]*/g;
function cssVar(cssVariable, defaultValue) {
  if (!cssVariable || !cssVariable.match(cssVariableRegex)) {
    throw new PolishedError(73);
  }
  var variableValue;
  if (typeof document !== "undefined" && document.documentElement !== null) {
    variableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariable);
  }
  if (variableValue) {
    return variableValue.trim();
  } else if (defaultValue) {
    return defaultValue;
  }
  throw new PolishedError(74);
}
function capitalizeString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
var positionMap$1 = ["Top", "Right", "Bottom", "Left"];
function generateProperty(property, position2) {
  if (!property)
    return position2.toLowerCase();
  var splitProperty = property.split("-");
  if (splitProperty.length > 1) {
    splitProperty.splice(1, 0, position2);
    return splitProperty.reduce(function(acc, val) {
      return "" + acc + capitalizeString(val);
    });
  }
  var joinedProperty = property.replace(/([a-z])([A-Z])/g, "$1" + position2 + "$2");
  return property === joinedProperty ? "" + property + position2 : joinedProperty;
}
function generateStyles(property, valuesWithDefaults) {
  var styles = {};
  for (var i = 0; i < valuesWithDefaults.length; i += 1) {
    if (valuesWithDefaults[i] || valuesWithDefaults[i] === 0) {
      styles[generateProperty(property, positionMap$1[i])] = valuesWithDefaults[i];
    }
  }
  return styles;
}
function directionalProperty(property) {
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }
  var firstValue = values[0], _values$ = values[1], secondValue = _values$ === void 0 ? firstValue : _values$, _values$2 = values[2], thirdValue = _values$2 === void 0 ? firstValue : _values$2, _values$3 = values[3], fourthValue = _values$3 === void 0 ? secondValue : _values$3;
  var valuesWithDefaults = [firstValue, secondValue, thirdValue, fourthValue];
  return generateStyles(property, valuesWithDefaults);
}
function endsWith(string, suffix) {
  return string.substr(-suffix.length) === suffix;
}
var cssRegex$1 = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;
function stripUnit(value) {
  if (typeof value !== "string")
    return value;
  var matchedValue = value.match(cssRegex$1);
  return matchedValue ? parseFloat(value) : value;
}
var pxtoFactory = function pxtoFactory2(to) {
  return function(pxval, base) {
    if (base === void 0) {
      base = "16px";
    }
    var newPxval = pxval;
    var newBase = base;
    if (typeof pxval === "string") {
      if (!endsWith(pxval, "px")) {
        throw new PolishedError(69, to, pxval);
      }
      newPxval = stripUnit(pxval);
    }
    if (typeof base === "string") {
      if (!endsWith(base, "px")) {
        throw new PolishedError(70, to, base);
      }
      newBase = stripUnit(base);
    }
    if (typeof newPxval === "string") {
      throw new PolishedError(71, pxval, to);
    }
    if (typeof newBase === "string") {
      throw new PolishedError(72, base, to);
    }
    return "" + newPxval / newBase + to;
  };
};
var pixelsto = pxtoFactory;
var em = pixelsto("em");
var em$1 = em;
var cssRegex = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;
function getValueAndUnit(value) {
  if (typeof value !== "string")
    return [value, ""];
  var matchedValue = value.match(cssRegex);
  if (matchedValue)
    return [parseFloat(value), matchedValue[2]];
  return [value, void 0];
}
function important(styleBlock, rules) {
  if (typeof styleBlock !== "object" || styleBlock === null) {
    throw new PolishedError(75, typeof styleBlock);
  }
  var newStyleBlock = {};
  Object.keys(styleBlock).forEach(function(key) {
    if (typeof styleBlock[key] === "object" && styleBlock[key] !== null) {
      newStyleBlock[key] = important(styleBlock[key], rules);
    } else if (!rules || rules && (rules === key || rules.indexOf(key) >= 0)) {
      newStyleBlock[key] = styleBlock[key] + " !important";
    } else {
      newStyleBlock[key] = styleBlock[key];
    }
  });
  return newStyleBlock;
}
var ratioNames = {
  minorSecond: 1.067,
  majorSecond: 1.125,
  minorThird: 1.2,
  majorThird: 1.25,
  perfectFourth: 1.333,
  augFourth: 1.414,
  perfectFifth: 1.5,
  minorSixth: 1.6,
  goldenSection: 1.618,
  majorSixth: 1.667,
  minorSeventh: 1.778,
  majorSeventh: 1.875,
  octave: 2,
  majorTenth: 2.5,
  majorEleventh: 2.667,
  majorTwelfth: 3,
  doubleOctave: 4
};
function getRatio(ratioName) {
  return ratioNames[ratioName];
}
function modularScale(steps, base, ratio) {
  if (base === void 0) {
    base = "1em";
  }
  if (ratio === void 0) {
    ratio = 1.333;
  }
  if (typeof steps !== "number") {
    throw new PolishedError(42);
  }
  if (typeof ratio === "string" && !ratioNames[ratio]) {
    throw new PolishedError(43);
  }
  var _ref = typeof base === "string" ? getValueAndUnit(base) : [base, ""], realBase = _ref[0], unit = _ref[1];
  var realRatio = typeof ratio === "string" ? getRatio(ratio) : ratio;
  if (typeof realBase === "string") {
    throw new PolishedError(44, base);
  }
  return "" + realBase * Math.pow(realRatio, steps) + (unit || "");
}
var rem = pixelsto("rem");
var rem$1 = rem;
var defaultFontSize = 16;
function convertBase(base) {
  var deconstructedValue = getValueAndUnit(base);
  if (deconstructedValue[1] === "px") {
    return parseFloat(base);
  }
  if (deconstructedValue[1] === "%") {
    return parseFloat(base) / 100 * defaultFontSize;
  }
  throw new PolishedError(78, deconstructedValue[1]);
}
function getBaseFromDoc() {
  if (typeof document !== "undefined" && document.documentElement !== null) {
    var rootFontSize = getComputedStyle(document.documentElement).fontSize;
    return rootFontSize ? convertBase(rootFontSize) : defaultFontSize;
  }
  return defaultFontSize;
}
function remToPx(value, base) {
  var deconstructedValue = getValueAndUnit(value);
  if (deconstructedValue[1] !== "rem" && deconstructedValue[1] !== "") {
    throw new PolishedError(77, deconstructedValue[1]);
  }
  var newBase = base ? convertBase(base) : getBaseFromDoc();
  return deconstructedValue[0] * newBase + "px";
}
var functionsMap$3 = {
  back: "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
  circ: "cubic-bezier(0.600,  0.040, 0.980, 0.335)",
  cubic: "cubic-bezier(0.550,  0.055, 0.675, 0.190)",
  expo: "cubic-bezier(0.950,  0.050, 0.795, 0.035)",
  quad: "cubic-bezier(0.550,  0.085, 0.680, 0.530)",
  quart: "cubic-bezier(0.895,  0.030, 0.685, 0.220)",
  quint: "cubic-bezier(0.755,  0.050, 0.855, 0.060)",
  sine: "cubic-bezier(0.470,  0.000, 0.745, 0.715)"
};
function easeIn(functionName) {
  return functionsMap$3[functionName.toLowerCase().trim()];
}
var functionsMap$2 = {
  back: "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
  circ: "cubic-bezier(0.785,  0.135, 0.150, 0.860)",
  cubic: "cubic-bezier(0.645,  0.045, 0.355, 1.000)",
  expo: "cubic-bezier(1.000,  0.000, 0.000, 1.000)",
  quad: "cubic-bezier(0.455,  0.030, 0.515, 0.955)",
  quart: "cubic-bezier(0.770,  0.000, 0.175, 1.000)",
  quint: "cubic-bezier(0.860,  0.000, 0.070, 1.000)",
  sine: "cubic-bezier(0.445,  0.050, 0.550, 0.950)"
};
function easeInOut(functionName) {
  return functionsMap$2[functionName.toLowerCase().trim()];
}
var functionsMap$1 = {
  back: "cubic-bezier(0.175,  0.885, 0.320, 1.275)",
  cubic: "cubic-bezier(0.215,  0.610, 0.355, 1.000)",
  circ: "cubic-bezier(0.075,  0.820, 0.165, 1.000)",
  expo: "cubic-bezier(0.190,  1.000, 0.220, 1.000)",
  quad: "cubic-bezier(0.250,  0.460, 0.450, 0.940)",
  quart: "cubic-bezier(0.165,  0.840, 0.440, 1.000)",
  quint: "cubic-bezier(0.230,  1.000, 0.320, 1.000)",
  sine: "cubic-bezier(0.390,  0.575, 0.565, 1.000)"
};
function easeOut(functionName) {
  return functionsMap$1[functionName.toLowerCase().trim()];
}
function between(fromSize, toSize, minScreen, maxScreen) {
  if (minScreen === void 0) {
    minScreen = "320px";
  }
  if (maxScreen === void 0) {
    maxScreen = "1200px";
  }
  var _getValueAndUnit = getValueAndUnit(fromSize), unitlessFromSize = _getValueAndUnit[0], fromSizeUnit = _getValueAndUnit[1];
  var _getValueAndUnit2 = getValueAndUnit(toSize), unitlessToSize = _getValueAndUnit2[0], toSizeUnit = _getValueAndUnit2[1];
  var _getValueAndUnit3 = getValueAndUnit(minScreen), unitlessMinScreen = _getValueAndUnit3[0], minScreenUnit = _getValueAndUnit3[1];
  var _getValueAndUnit4 = getValueAndUnit(maxScreen), unitlessMaxScreen = _getValueAndUnit4[0], maxScreenUnit = _getValueAndUnit4[1];
  if (typeof unitlessMinScreen !== "number" || typeof unitlessMaxScreen !== "number" || !minScreenUnit || !maxScreenUnit || minScreenUnit !== maxScreenUnit) {
    throw new PolishedError(47);
  }
  if (typeof unitlessFromSize !== "number" || typeof unitlessToSize !== "number" || fromSizeUnit !== toSizeUnit) {
    throw new PolishedError(48);
  }
  if (fromSizeUnit !== minScreenUnit || toSizeUnit !== maxScreenUnit) {
    throw new PolishedError(76);
  }
  var slope = (unitlessFromSize - unitlessToSize) / (unitlessMinScreen - unitlessMaxScreen);
  var base = unitlessToSize - slope * unitlessMaxScreen;
  return "calc(" + base.toFixed(2) + (fromSizeUnit || "") + " + " + (100 * slope).toFixed(2) + "vw)";
}
function clearFix(parent) {
  var _ref;
  if (parent === void 0) {
    parent = "&";
  }
  var pseudoSelector = parent + "::after";
  return _ref = {}, _ref[pseudoSelector] = {
    clear: "both",
    content: '""',
    display: "table"
  }, _ref;
}
function cover(offset) {
  if (offset === void 0) {
    offset = 0;
  }
  return {
    position: "absolute",
    top: offset,
    right: offset,
    bottom: offset,
    left: offset
  };
}
function ellipsis(width, lines) {
  if (lines === void 0) {
    lines = 1;
  }
  var styles = {
    display: "inline-block",
    maxWidth: width || "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    wordWrap: "normal"
  };
  return lines > 1 ? _extends({}, styles, {
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
    display: "-webkit-box",
    whiteSpace: "normal"
  }) : styles;
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it)
    return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it)
      o = it;
    var i = 0;
    return function() {
      if (i >= o.length)
        return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function fluidRange(cssProp, minScreen, maxScreen) {
  if (minScreen === void 0) {
    minScreen = "320px";
  }
  if (maxScreen === void 0) {
    maxScreen = "1200px";
  }
  if (!Array.isArray(cssProp) && typeof cssProp !== "object" || cssProp === null) {
    throw new PolishedError(49);
  }
  if (Array.isArray(cssProp)) {
    var mediaQueries = {};
    var fallbacks = {};
    for (var _iterator = _createForOfIteratorHelperLoose(cssProp), _step; !(_step = _iterator()).done; ) {
      var _extends2, _extends3;
      var obj = _step.value;
      if (!obj.prop || !obj.fromSize || !obj.toSize) {
        throw new PolishedError(50);
      }
      fallbacks[obj.prop] = obj.fromSize;
      mediaQueries["@media (min-width: " + minScreen + ")"] = _extends({}, mediaQueries["@media (min-width: " + minScreen + ")"], (_extends2 = {}, _extends2[obj.prop] = between(obj.fromSize, obj.toSize, minScreen, maxScreen), _extends2));
      mediaQueries["@media (min-width: " + maxScreen + ")"] = _extends({}, mediaQueries["@media (min-width: " + maxScreen + ")"], (_extends3 = {}, _extends3[obj.prop] = obj.toSize, _extends3));
    }
    return _extends({}, fallbacks, mediaQueries);
  } else {
    var _ref, _ref2, _ref3;
    if (!cssProp.prop || !cssProp.fromSize || !cssProp.toSize) {
      throw new PolishedError(51);
    }
    return _ref3 = {}, _ref3[cssProp.prop] = cssProp.fromSize, _ref3["@media (min-width: " + minScreen + ")"] = (_ref = {}, _ref[cssProp.prop] = between(cssProp.fromSize, cssProp.toSize, minScreen, maxScreen), _ref), _ref3["@media (min-width: " + maxScreen + ")"] = (_ref2 = {}, _ref2[cssProp.prop] = cssProp.toSize, _ref2), _ref3;
  }
}
var dataURIRegex = /^\s*data:([a-z]+\/[a-z-]+(;[a-z-]+=[a-z-]+)?)?(;charset=[a-z0-9-]+)?(;base64)?,[a-z0-9!$&',()*+,;=\-._~:@/?%\s]*\s*$/i;
var formatHintMap = {
  woff: "woff",
  woff2: "woff2",
  ttf: "truetype",
  otf: "opentype",
  eot: "embedded-opentype",
  svg: "svg",
  svgz: "svg"
};
function generateFormatHint(format2, formatHint) {
  if (!formatHint)
    return "";
  return ' format("' + formatHintMap[format2] + '")';
}
function isDataURI(fontFilePath) {
  return !!fontFilePath.replace(/\s+/g, " ").match(dataURIRegex);
}
function generateFileReferences(fontFilePath, fileFormats, formatHint) {
  if (isDataURI(fontFilePath)) {
    return 'url("' + fontFilePath + '")' + generateFormatHint(fileFormats[0], formatHint);
  }
  var fileFontReferences = fileFormats.map(function(format2) {
    return 'url("' + fontFilePath + "." + format2 + '")' + generateFormatHint(format2, formatHint);
  });
  return fileFontReferences.join(", ");
}
function generateLocalReferences(localFonts) {
  var localFontReferences = localFonts.map(function(font) {
    return 'local("' + font + '")';
  });
  return localFontReferences.join(", ");
}
function generateSources(fontFilePath, localFonts, fileFormats, formatHint) {
  var fontReferences = [];
  if (localFonts)
    fontReferences.push(generateLocalReferences(localFonts));
  if (fontFilePath) {
    fontReferences.push(generateFileReferences(fontFilePath, fileFormats, formatHint));
  }
  return fontReferences.join(", ");
}
function fontFace(_ref) {
  var fontFamily = _ref.fontFamily, fontFilePath = _ref.fontFilePath, fontStretch = _ref.fontStretch, fontStyle = _ref.fontStyle, fontVariant = _ref.fontVariant, fontWeight = _ref.fontWeight, _ref$fileFormats = _ref.fileFormats, fileFormats = _ref$fileFormats === void 0 ? ["eot", "woff2", "woff", "ttf", "svg"] : _ref$fileFormats, _ref$formatHint = _ref.formatHint, formatHint = _ref$formatHint === void 0 ? false : _ref$formatHint, _ref$localFonts = _ref.localFonts, localFonts = _ref$localFonts === void 0 ? [fontFamily] : _ref$localFonts, unicodeRange = _ref.unicodeRange, fontDisplay = _ref.fontDisplay, fontVariationSettings = _ref.fontVariationSettings, fontFeatureSettings = _ref.fontFeatureSettings;
  if (!fontFamily)
    throw new PolishedError(55);
  if (!fontFilePath && !localFonts) {
    throw new PolishedError(52);
  }
  if (localFonts && !Array.isArray(localFonts)) {
    throw new PolishedError(53);
  }
  if (!Array.isArray(fileFormats)) {
    throw new PolishedError(54);
  }
  var fontFaceDeclaration = {
    "@font-face": {
      fontFamily,
      src: generateSources(fontFilePath, localFonts, fileFormats, formatHint),
      unicodeRange,
      fontStretch,
      fontStyle,
      fontVariant,
      fontWeight,
      fontDisplay,
      fontVariationSettings,
      fontFeatureSettings
    }
  };
  return JSON.parse(JSON.stringify(fontFaceDeclaration));
}
function hideText() {
  return {
    textIndent: "101%",
    overflow: "hidden",
    whiteSpace: "nowrap"
  };
}
function hideVisually() {
  return {
    border: "0",
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px"
  };
}
function hiDPI(ratio) {
  if (ratio === void 0) {
    ratio = 1.3;
  }
  return "\n    @media only screen and (-webkit-min-device-pixel-ratio: " + ratio + "),\n    only screen and (min--moz-device-pixel-ratio: " + ratio + "),\n    only screen and (-o-min-device-pixel-ratio: " + ratio + "/1),\n    only screen and (min-resolution: " + Math.round(ratio * 96) + "dpi),\n    only screen and (min-resolution: " + ratio + "dppx)\n  ";
}
function constructGradientValue(literals) {
  var template2 = "";
  for (var _len = arguments.length, substitutions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    substitutions[_key - 1] = arguments[_key];
  }
  for (var i = 0; i < literals.length; i += 1) {
    template2 += literals[i];
    if (i === substitutions.length - 1 && substitutions[i]) {
      var definedValues = substitutions.filter(function(substitute) {
        return !!substitute;
      });
      if (definedValues.length > 1) {
        template2 = template2.slice(0, -1);
        template2 += ", " + substitutions[i];
      } else if (definedValues.length === 1) {
        template2 += "" + substitutions[i];
      }
    } else if (substitutions[i]) {
      template2 += substitutions[i] + " ";
    }
  }
  return template2.trim();
}
var _templateObject$1;
function linearGradient(_ref) {
  var colorStops = _ref.colorStops, fallback = _ref.fallback, _ref$toDirection = _ref.toDirection, toDirection = _ref$toDirection === void 0 ? "" : _ref$toDirection;
  if (!colorStops || colorStops.length < 2) {
    throw new PolishedError(56);
  }
  return {
    backgroundColor: fallback || colorStops[0].replace(/,\s+/g, ",").split(" ")[0].replace(/,(?=\S)/g, ", "),
    backgroundImage: constructGradientValue(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteralLoose(["linear-gradient(", "", ")"])), toDirection, colorStops.join(", ").replace(/,(?=\S)/g, ", "))
  };
}
function normalize() {
  var _ref;
  return [(_ref = {
    html: {
      lineHeight: "1.15",
      textSizeAdjust: "100%"
    },
    body: {
      margin: "0"
    },
    main: {
      display: "block"
    },
    h1: {
      fontSize: "2em",
      margin: "0.67em 0"
    },
    hr: {
      boxSizing: "content-box",
      height: "0",
      overflow: "visible"
    },
    pre: {
      fontFamily: "monospace, monospace",
      fontSize: "1em"
    },
    a: {
      backgroundColor: "transparent"
    },
    "abbr[title]": {
      borderBottom: "none",
      textDecoration: "underline"
    }
  }, _ref["b,\n    strong"] = {
    fontWeight: "bolder"
  }, _ref["code,\n    kbd,\n    samp"] = {
    fontFamily: "monospace, monospace",
    fontSize: "1em"
  }, _ref.small = {
    fontSize: "80%"
  }, _ref["sub,\n    sup"] = {
    fontSize: "75%",
    lineHeight: "0",
    position: "relative",
    verticalAlign: "baseline"
  }, _ref.sub = {
    bottom: "-0.25em"
  }, _ref.sup = {
    top: "-0.5em"
  }, _ref.img = {
    borderStyle: "none"
  }, _ref["button,\n    input,\n    optgroup,\n    select,\n    textarea"] = {
    fontFamily: "inherit",
    fontSize: "100%",
    lineHeight: "1.15",
    margin: "0"
  }, _ref["button,\n    input"] = {
    overflow: "visible"
  }, _ref["button,\n    select"] = {
    textTransform: "none"
  }, _ref['button,\n    html [type="button"],\n    [type="reset"],\n    [type="submit"]'] = {
    WebkitAppearance: "button"
  }, _ref['button::-moz-focus-inner,\n    [type="button"]::-moz-focus-inner,\n    [type="reset"]::-moz-focus-inner,\n    [type="submit"]::-moz-focus-inner'] = {
    borderStyle: "none",
    padding: "0"
  }, _ref['button:-moz-focusring,\n    [type="button"]:-moz-focusring,\n    [type="reset"]:-moz-focusring,\n    [type="submit"]:-moz-focusring'] = {
    outline: "1px dotted ButtonText"
  }, _ref.fieldset = {
    padding: "0.35em 0.625em 0.75em"
  }, _ref.legend = {
    boxSizing: "border-box",
    color: "inherit",
    display: "table",
    maxWidth: "100%",
    padding: "0",
    whiteSpace: "normal"
  }, _ref.progress = {
    verticalAlign: "baseline"
  }, _ref.textarea = {
    overflow: "auto"
  }, _ref['[type="checkbox"],\n    [type="radio"]'] = {
    boxSizing: "border-box",
    padding: "0"
  }, _ref['[type="number"]::-webkit-inner-spin-button,\n    [type="number"]::-webkit-outer-spin-button'] = {
    height: "auto"
  }, _ref['[type="search"]'] = {
    WebkitAppearance: "textfield",
    outlineOffset: "-2px"
  }, _ref['[type="search"]::-webkit-search-decoration'] = {
    WebkitAppearance: "none"
  }, _ref["::-webkit-file-upload-button"] = {
    WebkitAppearance: "button",
    font: "inherit"
  }, _ref.details = {
    display: "block"
  }, _ref.summary = {
    display: "list-item"
  }, _ref.template = {
    display: "none"
  }, _ref["[hidden]"] = {
    display: "none"
  }, _ref), {
    "abbr[title]": {
      textDecoration: "underline dotted"
    }
  }];
}
var _templateObject;
function radialGradient(_ref) {
  var colorStops = _ref.colorStops, _ref$extent = _ref.extent, extent = _ref$extent === void 0 ? "" : _ref$extent, fallback = _ref.fallback, _ref$position = _ref.position, position2 = _ref$position === void 0 ? "" : _ref$position, _ref$shape = _ref.shape, shape = _ref$shape === void 0 ? "" : _ref$shape;
  if (!colorStops || colorStops.length < 2) {
    throw new PolishedError(57);
  }
  return {
    backgroundColor: fallback || colorStops[0].split(" ")[0],
    backgroundImage: constructGradientValue(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["radial-gradient(", "", "", "", ")"])), position2, shape, extent, colorStops.join(", "))
  };
}
function retinaImage(filename, backgroundSize, extension, retinaFilename, retinaSuffix) {
  var _ref;
  if (extension === void 0) {
    extension = "png";
  }
  if (retinaSuffix === void 0) {
    retinaSuffix = "_2x";
  }
  if (!filename) {
    throw new PolishedError(58);
  }
  var ext = extension.replace(/^\./, "");
  var rFilename = retinaFilename ? retinaFilename + "." + ext : "" + filename + retinaSuffix + "." + ext;
  return _ref = {
    backgroundImage: "url(" + filename + "." + ext + ")"
  }, _ref[hiDPI()] = _extends({
    backgroundImage: "url(" + rFilename + ")"
  }, backgroundSize ? {
    backgroundSize
  } : {}), _ref;
}
var functionsMap = {
  easeInBack: "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
  easeInCirc: "cubic-bezier(0.600,  0.040, 0.980, 0.335)",
  easeInCubic: "cubic-bezier(0.550,  0.055, 0.675, 0.190)",
  easeInExpo: "cubic-bezier(0.950,  0.050, 0.795, 0.035)",
  easeInQuad: "cubic-bezier(0.550,  0.085, 0.680, 0.530)",
  easeInQuart: "cubic-bezier(0.895,  0.030, 0.685, 0.220)",
  easeInQuint: "cubic-bezier(0.755,  0.050, 0.855, 0.060)",
  easeInSine: "cubic-bezier(0.470,  0.000, 0.745, 0.715)",
  easeOutBack: "cubic-bezier(0.175,  0.885, 0.320, 1.275)",
  easeOutCubic: "cubic-bezier(0.215,  0.610, 0.355, 1.000)",
  easeOutCirc: "cubic-bezier(0.075,  0.820, 0.165, 1.000)",
  easeOutExpo: "cubic-bezier(0.190,  1.000, 0.220, 1.000)",
  easeOutQuad: "cubic-bezier(0.250,  0.460, 0.450, 0.940)",
  easeOutQuart: "cubic-bezier(0.165,  0.840, 0.440, 1.000)",
  easeOutQuint: "cubic-bezier(0.230,  1.000, 0.320, 1.000)",
  easeOutSine: "cubic-bezier(0.390,  0.575, 0.565, 1.000)",
  easeInOutBack: "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
  easeInOutCirc: "cubic-bezier(0.785,  0.135, 0.150, 0.860)",
  easeInOutCubic: "cubic-bezier(0.645,  0.045, 0.355, 1.000)",
  easeInOutExpo: "cubic-bezier(1.000,  0.000, 0.000, 1.000)",
  easeInOutQuad: "cubic-bezier(0.455,  0.030, 0.515, 0.955)",
  easeInOutQuart: "cubic-bezier(0.770,  0.000, 0.175, 1.000)",
  easeInOutQuint: "cubic-bezier(0.860,  0.000, 0.070, 1.000)",
  easeInOutSine: "cubic-bezier(0.445,  0.050, 0.550, 0.950)"
};
function getTimingFunction(functionName) {
  return functionsMap[functionName];
}
function timingFunctions(timingFunction) {
  return getTimingFunction(timingFunction);
}
var getBorderWidth = function getBorderWidth2(pointingDirection, height, width) {
  var fullWidth = "" + width[0] + (width[1] || "");
  var halfWidth = "" + width[0] / 2 + (width[1] || "");
  var fullHeight = "" + height[0] + (height[1] || "");
  var halfHeight = "" + height[0] / 2 + (height[1] || "");
  switch (pointingDirection) {
    case "top":
      return "0 " + halfWidth + " " + fullHeight + " " + halfWidth;
    case "topLeft":
      return fullWidth + " " + fullHeight + " 0 0";
    case "left":
      return halfHeight + " " + fullWidth + " " + halfHeight + " 0";
    case "bottomLeft":
      return fullWidth + " 0 0 " + fullHeight;
    case "bottom":
      return fullHeight + " " + halfWidth + " 0 " + halfWidth;
    case "bottomRight":
      return "0 0 " + fullWidth + " " + fullHeight;
    case "right":
      return halfHeight + " 0 " + halfHeight + " " + fullWidth;
    case "topRight":
    default:
      return "0 " + fullWidth + " " + fullHeight + " 0";
  }
};
var getBorderColor = function getBorderColor2(pointingDirection, foregroundColor) {
  switch (pointingDirection) {
    case "top":
    case "bottomRight":
      return {
        borderBottomColor: foregroundColor
      };
    case "right":
    case "bottomLeft":
      return {
        borderLeftColor: foregroundColor
      };
    case "bottom":
    case "topLeft":
      return {
        borderTopColor: foregroundColor
      };
    case "left":
    case "topRight":
      return {
        borderRightColor: foregroundColor
      };
    default:
      throw new PolishedError(59);
  }
};
function triangle(_ref) {
  var pointingDirection = _ref.pointingDirection, height = _ref.height, width = _ref.width, foregroundColor = _ref.foregroundColor, _ref$backgroundColor = _ref.backgroundColor, backgroundColor = _ref$backgroundColor === void 0 ? "transparent" : _ref$backgroundColor;
  var widthAndUnit = getValueAndUnit(width);
  var heightAndUnit = getValueAndUnit(height);
  if (isNaN(heightAndUnit[0]) || isNaN(widthAndUnit[0])) {
    throw new PolishedError(60);
  }
  return _extends({
    width: "0",
    height: "0",
    borderColor: backgroundColor
  }, getBorderColor(pointingDirection, foregroundColor), {
    borderStyle: "solid",
    borderWidth: getBorderWidth(pointingDirection, heightAndUnit, widthAndUnit)
  });
}
function wordWrap(wrap) {
  if (wrap === void 0) {
    wrap = "break-word";
  }
  var wordBreak = wrap === "break-word" ? "break-all" : wrap;
  return {
    overflowWrap: wrap,
    wordWrap: wrap,
    wordBreak
  };
}
function colorToInt(color) {
  return Math.round(color * 255);
}
function convertToInt(red, green, blue) {
  return colorToInt(red) + "," + colorToInt(green) + "," + colorToInt(blue);
}
function hslToRgb(hue, saturation, lightness, convert) {
  if (convert === void 0) {
    convert = convertToInt;
  }
  if (saturation === 0) {
    return convert(lightness, lightness, lightness);
  }
  var huePrime = (hue % 360 + 360) % 360 / 60;
  var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  var secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
  var red = 0;
  var green = 0;
  var blue = 0;
  if (huePrime >= 0 && huePrime < 1) {
    red = chroma;
    green = secondComponent;
  } else if (huePrime >= 1 && huePrime < 2) {
    red = secondComponent;
    green = chroma;
  } else if (huePrime >= 2 && huePrime < 3) {
    green = chroma;
    blue = secondComponent;
  } else if (huePrime >= 3 && huePrime < 4) {
    green = secondComponent;
    blue = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    red = secondComponent;
    blue = chroma;
  } else if (huePrime >= 5 && huePrime < 6) {
    red = chroma;
    blue = secondComponent;
  }
  var lightnessModification = lightness - chroma / 2;
  var finalRed = red + lightnessModification;
  var finalGreen = green + lightnessModification;
  var finalBlue = blue + lightnessModification;
  return convert(finalRed, finalGreen, finalBlue);
}
var namedColorMap = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "00ffff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "0000ff",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "00ffff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "ff00ff",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "639",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
};
function nameToHex(color) {
  if (typeof color !== "string")
    return color;
  var normalizedColorName = color.toLowerCase();
  return namedColorMap[normalizedColorName] ? "#" + namedColorMap[normalizedColorName] : color;
}
var hexRegex = /^#[a-fA-F0-9]{6}$/;
var hexRgbaRegex = /^#[a-fA-F0-9]{8}$/;
var reducedHexRegex = /^#[a-fA-F0-9]{3}$/;
var reducedRgbaHexRegex = /^#[a-fA-F0-9]{4}$/;
var rgbRegex = /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i;
var rgbaRegex = /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
var hslRegex = /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i;
var hslaRegex = /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
function parseToRgb(color) {
  if (typeof color !== "string") {
    throw new PolishedError(3);
  }
  var normalizedColor = nameToHex(color);
  if (normalizedColor.match(hexRegex)) {
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
      green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
      blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16)
    };
  }
  if (normalizedColor.match(hexRgbaRegex)) {
    var alpha = parseFloat((parseInt("" + normalizedColor[7] + normalizedColor[8], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
      green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
      blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16),
      alpha
    };
  }
  if (normalizedColor.match(reducedHexRegex)) {
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
      green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
      blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16)
    };
  }
  if (normalizedColor.match(reducedRgbaHexRegex)) {
    var _alpha = parseFloat((parseInt("" + normalizedColor[4] + normalizedColor[4], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
      green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
      blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16),
      alpha: _alpha
    };
  }
  var rgbMatched = rgbRegex.exec(normalizedColor);
  if (rgbMatched) {
    return {
      red: parseInt("" + rgbMatched[1], 10),
      green: parseInt("" + rgbMatched[2], 10),
      blue: parseInt("" + rgbMatched[3], 10)
    };
  }
  var rgbaMatched = rgbaRegex.exec(normalizedColor.substring(0, 50));
  if (rgbaMatched) {
    return {
      red: parseInt("" + rgbaMatched[1], 10),
      green: parseInt("" + rgbaMatched[2], 10),
      blue: parseInt("" + rgbaMatched[3], 10),
      alpha: parseFloat("" + rgbaMatched[4]) > 1 ? parseFloat("" + rgbaMatched[4]) / 100 : parseFloat("" + rgbaMatched[4])
    };
  }
  var hslMatched = hslRegex.exec(normalizedColor);
  if (hslMatched) {
    var hue = parseInt("" + hslMatched[1], 10);
    var saturation = parseInt("" + hslMatched[2], 10) / 100;
    var lightness = parseInt("" + hslMatched[3], 10) / 100;
    var rgbColorString = "rgb(" + hslToRgb(hue, saturation, lightness) + ")";
    var hslRgbMatched = rgbRegex.exec(rgbColorString);
    if (!hslRgbMatched) {
      throw new PolishedError(4, normalizedColor, rgbColorString);
    }
    return {
      red: parseInt("" + hslRgbMatched[1], 10),
      green: parseInt("" + hslRgbMatched[2], 10),
      blue: parseInt("" + hslRgbMatched[3], 10)
    };
  }
  var hslaMatched = hslaRegex.exec(normalizedColor.substring(0, 50));
  if (hslaMatched) {
    var _hue = parseInt("" + hslaMatched[1], 10);
    var _saturation = parseInt("" + hslaMatched[2], 10) / 100;
    var _lightness = parseInt("" + hslaMatched[3], 10) / 100;
    var _rgbColorString = "rgb(" + hslToRgb(_hue, _saturation, _lightness) + ")";
    var _hslRgbMatched = rgbRegex.exec(_rgbColorString);
    if (!_hslRgbMatched) {
      throw new PolishedError(4, normalizedColor, _rgbColorString);
    }
    return {
      red: parseInt("" + _hslRgbMatched[1], 10),
      green: parseInt("" + _hslRgbMatched[2], 10),
      blue: parseInt("" + _hslRgbMatched[3], 10),
      alpha: parseFloat("" + hslaMatched[4]) > 1 ? parseFloat("" + hslaMatched[4]) / 100 : parseFloat("" + hslaMatched[4])
    };
  }
  throw new PolishedError(5);
}
function rgbToHsl(color) {
  var red = color.red / 255;
  var green = color.green / 255;
  var blue = color.blue / 255;
  var max2 = Math.max(red, green, blue);
  var min2 = Math.min(red, green, blue);
  var lightness = (max2 + min2) / 2;
  if (max2 === min2) {
    if (color.alpha !== void 0) {
      return {
        hue: 0,
        saturation: 0,
        lightness,
        alpha: color.alpha
      };
    } else {
      return {
        hue: 0,
        saturation: 0,
        lightness
      };
    }
  }
  var hue;
  var delta = max2 - min2;
  var saturation = lightness > 0.5 ? delta / (2 - max2 - min2) : delta / (max2 + min2);
  switch (max2) {
    case red:
      hue = (green - blue) / delta + (green < blue ? 6 : 0);
      break;
    case green:
      hue = (blue - red) / delta + 2;
      break;
    default:
      hue = (red - green) / delta + 4;
      break;
  }
  hue *= 60;
  if (color.alpha !== void 0) {
    return {
      hue,
      saturation,
      lightness,
      alpha: color.alpha
    };
  }
  return {
    hue,
    saturation,
    lightness
  };
}
function parseToHsl(color) {
  return rgbToHsl(parseToRgb(color));
}
var reduceHexValue = function reduceHexValue2(value) {
  if (value.length === 7 && value[1] === value[2] && value[3] === value[4] && value[5] === value[6]) {
    return "#" + value[1] + value[3] + value[5];
  }
  return value;
};
var reduceHexValue$1 = reduceHexValue;
function numberToHex(value) {
  var hex = value.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}
function colorToHex(color) {
  return numberToHex(Math.round(color * 255));
}
function convertToHex(red, green, blue) {
  return reduceHexValue$1("#" + colorToHex(red) + colorToHex(green) + colorToHex(blue));
}
function hslToHex(hue, saturation, lightness) {
  return hslToRgb(hue, saturation, lightness, convertToHex);
}
function hsl(value, saturation, lightness) {
  if (typeof value === "number" && typeof saturation === "number" && typeof lightness === "number") {
    return hslToHex(value, saturation, lightness);
  } else if (typeof value === "object" && saturation === void 0 && lightness === void 0) {
    return hslToHex(value.hue, value.saturation, value.lightness);
  }
  throw new PolishedError(1);
}
function hsla(value, saturation, lightness, alpha) {
  if (typeof value === "number" && typeof saturation === "number" && typeof lightness === "number" && typeof alpha === "number") {
    return alpha >= 1 ? hslToHex(value, saturation, lightness) : "rgba(" + hslToRgb(value, saturation, lightness) + "," + alpha + ")";
  } else if (typeof value === "object" && saturation === void 0 && lightness === void 0 && alpha === void 0) {
    return value.alpha >= 1 ? hslToHex(value.hue, value.saturation, value.lightness) : "rgba(" + hslToRgb(value.hue, value.saturation, value.lightness) + "," + value.alpha + ")";
  }
  throw new PolishedError(2);
}
function rgb(value, green, blue) {
  if (typeof value === "number" && typeof green === "number" && typeof blue === "number") {
    return reduceHexValue$1("#" + numberToHex(value) + numberToHex(green) + numberToHex(blue));
  } else if (typeof value === "object" && green === void 0 && blue === void 0) {
    return reduceHexValue$1("#" + numberToHex(value.red) + numberToHex(value.green) + numberToHex(value.blue));
  }
  throw new PolishedError(6);
}
function rgba(firstValue, secondValue, thirdValue, fourthValue) {
  if (typeof firstValue === "string" && typeof secondValue === "number") {
    var rgbValue = parseToRgb(firstValue);
    return "rgba(" + rgbValue.red + "," + rgbValue.green + "," + rgbValue.blue + "," + secondValue + ")";
  } else if (typeof firstValue === "number" && typeof secondValue === "number" && typeof thirdValue === "number" && typeof fourthValue === "number") {
    return fourthValue >= 1 ? rgb(firstValue, secondValue, thirdValue) : "rgba(" + firstValue + "," + secondValue + "," + thirdValue + "," + fourthValue + ")";
  } else if (typeof firstValue === "object" && secondValue === void 0 && thirdValue === void 0 && fourthValue === void 0) {
    return firstValue.alpha >= 1 ? rgb(firstValue.red, firstValue.green, firstValue.blue) : "rgba(" + firstValue.red + "," + firstValue.green + "," + firstValue.blue + "," + firstValue.alpha + ")";
  }
  throw new PolishedError(7);
}
var isRgb = function isRgb2(color) {
  return typeof color.red === "number" && typeof color.green === "number" && typeof color.blue === "number" && (typeof color.alpha !== "number" || typeof color.alpha === "undefined");
};
var isRgba = function isRgba2(color) {
  return typeof color.red === "number" && typeof color.green === "number" && typeof color.blue === "number" && typeof color.alpha === "number";
};
var isHsl = function isHsl2(color) {
  return typeof color.hue === "number" && typeof color.saturation === "number" && typeof color.lightness === "number" && (typeof color.alpha !== "number" || typeof color.alpha === "undefined");
};
var isHsla = function isHsla2(color) {
  return typeof color.hue === "number" && typeof color.saturation === "number" && typeof color.lightness === "number" && typeof color.alpha === "number";
};
function toColorString(color) {
  if (typeof color !== "object")
    throw new PolishedError(8);
  if (isRgba(color))
    return rgba(color);
  if (isRgb(color))
    return rgb(color);
  if (isHsla(color))
    return hsla(color);
  if (isHsl(color))
    return hsl(color);
  throw new PolishedError(8);
}
function curried(f, length, acc) {
  return function fn() {
    var combined = acc.concat(Array.prototype.slice.call(arguments));
    return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
  };
}
function curry(f) {
  return curried(f, f.length, []);
}
function adjustHue(degree, color) {
  if (color === "transparent")
    return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    hue: hslColor.hue + parseFloat(degree)
  }));
}
var curriedAdjustHue = curry(adjustHue);
var curriedAdjustHue$1 = curriedAdjustHue;
function complement(color) {
  if (color === "transparent")
    return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    hue: (hslColor.hue + 180) % 360
  }));
}
function guard(lowerBoundary, upperBoundary, value) {
  return Math.max(lowerBoundary, Math.min(upperBoundary, value));
}
function darken(amount, color) {
  if (color === "transparent")
    return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    lightness: guard(0, 1, hslColor.lightness - parseFloat(amount))
  }));
}
var curriedDarken = curry(darken);
var curriedDarken$1 = curriedDarken;
function desaturate(amount, color) {
  if (color === "transparent")
    return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    saturation: guard(0, 1, hslColor.saturation - parseFloat(amount))
  }));
}
var curriedDesaturate = curry(desaturate);
var curriedDesaturate$1 = curriedDesaturate;
function getLuminance(color) {
  if (color === "transparent")
    return 0;
  var rgbColor = parseToRgb(color);
  var _Object$keys$map = Object.keys(rgbColor).map(function(key) {
    var channel = rgbColor[key] / 255;
    return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
  }), r = _Object$keys$map[0], g = _Object$keys$map[1], b = _Object$keys$map[2];
  return parseFloat((0.2126 * r + 0.7152 * g + 0.0722 * b).toFixed(3));
}
function getContrast(color1, color2) {
  var luminance1 = getLuminance(color1);
  var luminance2 = getLuminance(color2);
  return parseFloat((luminance1 > luminance2 ? (luminance1 + 0.05) / (luminance2 + 0.05) : (luminance2 + 0.05) / (luminance1 + 0.05)).toFixed(2));
}
function grayscale(color) {
  if (color === "transparent")
    return color;
  return toColorString(_extends({}, parseToHsl(color), {
    saturation: 0
  }));
}
function hslToColorString(color) {
  if (typeof color === "object" && typeof color.hue === "number" && typeof color.saturation === "number" && typeof color.lightness === "number") {
    if (color.alpha && typeof color.alpha === "number") {
      return hsla({
        hue: color.hue,
        saturation: color.saturation,
        lightness: color.lightness,
        alpha: color.alpha
      });
    }
    return hsl({
      hue: color.hue,
      saturation: color.saturation,
      lightness: color.lightness
    });
  }
  throw new PolishedError(45);
}
function invert(color) {
  if (color === "transparent")
    return color;
  var value = parseToRgb(color);
  return toColorString(_extends({}, value, {
    red: 255 - value.red,
    green: 255 - value.green,
    blue: 255 - value.blue
  }));
}
function lighten(amount, color) {
  if (color === "transparent")
    return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    lightness: guard(0, 1, hslColor.lightness + parseFloat(amount))
  }));
}
var curriedLighten = curry(lighten);
var curriedLighten$1 = curriedLighten;
function meetsContrastGuidelines(color1, color2) {
  var contrastRatio = getContrast(color1, color2);
  return {
    AA: contrastRatio >= 4.5,
    AALarge: contrastRatio >= 3,
    AAA: contrastRatio >= 7,
    AAALarge: contrastRatio >= 4.5
  };
}
function mix(weight, color, otherColor) {
  if (color === "transparent")
    return otherColor;
  if (otherColor === "transparent")
    return color;
  if (weight === 0)
    return otherColor;
  var parsedColor1 = parseToRgb(color);
  var color1 = _extends({}, parsedColor1, {
    alpha: typeof parsedColor1.alpha === "number" ? parsedColor1.alpha : 1
  });
  var parsedColor2 = parseToRgb(otherColor);
  var color2 = _extends({}, parsedColor2, {
    alpha: typeof parsedColor2.alpha === "number" ? parsedColor2.alpha : 1
  });
  var alphaDelta = color1.alpha - color2.alpha;
  var x = parseFloat(weight) * 2 - 1;
  var y = x * alphaDelta === -1 ? x : x + alphaDelta;
  var z = 1 + x * alphaDelta;
  var weight1 = (y / z + 1) / 2;
  var weight2 = 1 - weight1;
  var mixedColor = {
    red: Math.floor(color1.red * weight1 + color2.red * weight2),
    green: Math.floor(color1.green * weight1 + color2.green * weight2),
    blue: Math.floor(color1.blue * weight1 + color2.blue * weight2),
    alpha: color1.alpha * parseFloat(weight) + color2.alpha * (1 - parseFloat(weight))
  };
  return rgba(mixedColor);
}
var curriedMix = curry(mix);
var mix$1 = curriedMix;
function opacify(amount, color) {
  if (color === "transparent")
    return color;
  var parsedColor = parseToRgb(color);
  var alpha = typeof parsedColor.alpha === "number" ? parsedColor.alpha : 1;
  var colorWithAlpha = _extends({}, parsedColor, {
    alpha: guard(0, 1, (alpha * 100 + parseFloat(amount) * 100) / 100)
  });
  return rgba(colorWithAlpha);
}
var curriedOpacify = curry(opacify);
var curriedOpacify$1 = curriedOpacify;
var defaultReturnIfLightColor = "#000";
var defaultReturnIfDarkColor = "#fff";
function readableColor(color, returnIfLightColor, returnIfDarkColor, strict) {
  if (returnIfLightColor === void 0) {
    returnIfLightColor = defaultReturnIfLightColor;
  }
  if (returnIfDarkColor === void 0) {
    returnIfDarkColor = defaultReturnIfDarkColor;
  }
  if (strict === void 0) {
    strict = true;
  }
  var isColorLight = getLuminance(color) > 0.179;
  var preferredReturnColor = isColorLight ? returnIfLightColor : returnIfDarkColor;
  if (!strict || getContrast(color, preferredReturnColor) >= 4.5) {
    return preferredReturnColor;
  }
  return isColorLight ? defaultReturnIfLightColor : defaultReturnIfDarkColor;
}
function rgbToColorString(color) {
  if (typeof color === "object" && typeof color.red === "number" && typeof color.green === "number" && typeof color.blue === "number") {
    if (typeof color.alpha === "number") {
      return rgba({
        red: color.red,
        green: color.green,
        blue: color.blue,
        alpha: color.alpha
      });
    }
    return rgb({
      red: color.red,
      green: color.green,
      blue: color.blue
    });
  }
  throw new PolishedError(46);
}
function saturate(amount, color) {
  if (color === "transparent")
    return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    saturation: guard(0, 1, hslColor.saturation + parseFloat(amount))
  }));
}
var curriedSaturate = curry(saturate);
var curriedSaturate$1 = curriedSaturate;
function setHue(hue, color) {
  if (color === "transparent")
    return color;
  return toColorString(_extends({}, parseToHsl(color), {
    hue: parseFloat(hue)
  }));
}
var curriedSetHue = curry(setHue);
var curriedSetHue$1 = curriedSetHue;
function setLightness(lightness, color) {
  if (color === "transparent")
    return color;
  return toColorString(_extends({}, parseToHsl(color), {
    lightness: parseFloat(lightness)
  }));
}
var curriedSetLightness = curry(setLightness);
var curriedSetLightness$1 = curriedSetLightness;
function setSaturation(saturation, color) {
  if (color === "transparent")
    return color;
  return toColorString(_extends({}, parseToHsl(color), {
    saturation: parseFloat(saturation)
  }));
}
var curriedSetSaturation = curry(setSaturation);
var curriedSetSaturation$1 = curriedSetSaturation;
function shade(percentage, color) {
  if (color === "transparent")
    return color;
  return mix$1(parseFloat(percentage), "rgb(0, 0, 0)", color);
}
var curriedShade = curry(shade);
var curriedShade$1 = curriedShade;
function tint(percentage, color) {
  if (color === "transparent")
    return color;
  return mix$1(parseFloat(percentage), "rgb(255, 255, 255)", color);
}
var curriedTint = curry(tint);
var curriedTint$1 = curriedTint;
function transparentize(amount, color) {
  if (color === "transparent")
    return color;
  var parsedColor = parseToRgb(color);
  var alpha = typeof parsedColor.alpha === "number" ? parsedColor.alpha : 1;
  var colorWithAlpha = _extends({}, parsedColor, {
    alpha: guard(0, 1, +(alpha * 100 - parseFloat(amount) * 100).toFixed(2) / 100)
  });
  return rgba(colorWithAlpha);
}
var curriedTransparentize = curry(transparentize);
var curriedTransparentize$1 = curriedTransparentize;
function animation() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var multiMode = Array.isArray(args[0]);
  if (!multiMode && args.length > 8) {
    throw new PolishedError(64);
  }
  var code = args.map(function(arg) {
    if (multiMode && !Array.isArray(arg) || !multiMode && Array.isArray(arg)) {
      throw new PolishedError(65);
    }
    if (Array.isArray(arg) && arg.length > 8) {
      throw new PolishedError(66);
    }
    return Array.isArray(arg) ? arg.join(" ") : arg;
  }).join(", ");
  return {
    animation: code
  };
}
function backgroundImages() {
  for (var _len = arguments.length, properties = new Array(_len), _key = 0; _key < _len; _key++) {
    properties[_key] = arguments[_key];
  }
  return {
    backgroundImage: properties.join(", ")
  };
}
function backgrounds() {
  for (var _len = arguments.length, properties = new Array(_len), _key = 0; _key < _len; _key++) {
    properties[_key] = arguments[_key];
  }
  return {
    background: properties.join(", ")
  };
}
var sideMap = ["top", "right", "bottom", "left"];
function border(sideKeyword) {
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }
  if (typeof sideKeyword === "string" && sideMap.indexOf(sideKeyword) >= 0) {
    var _ref;
    return _ref = {}, _ref["border" + capitalizeString(sideKeyword) + "Width"] = values[0], _ref["border" + capitalizeString(sideKeyword) + "Style"] = values[1], _ref["border" + capitalizeString(sideKeyword) + "Color"] = values[2], _ref;
  } else {
    values.unshift(sideKeyword);
    return {
      borderWidth: values[0],
      borderStyle: values[1],
      borderColor: values[2]
    };
  }
}
function borderColor() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }
  return directionalProperty.apply(void 0, ["borderColor"].concat(values));
}
function borderRadius(side, radius) {
  var uppercaseSide = capitalizeString(side);
  if (!radius && radius !== 0) {
    throw new PolishedError(62);
  }
  if (uppercaseSide === "Top" || uppercaseSide === "Bottom") {
    var _ref;
    return _ref = {}, _ref["border" + uppercaseSide + "RightRadius"] = radius, _ref["border" + uppercaseSide + "LeftRadius"] = radius, _ref;
  }
  if (uppercaseSide === "Left" || uppercaseSide === "Right") {
    var _ref2;
    return _ref2 = {}, _ref2["borderTop" + uppercaseSide + "Radius"] = radius, _ref2["borderBottom" + uppercaseSide + "Radius"] = radius, _ref2;
  }
  throw new PolishedError(63);
}
function borderStyle() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }
  return directionalProperty.apply(void 0, ["borderStyle"].concat(values));
}
function borderWidth() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }
  return directionalProperty.apply(void 0, ["borderWidth"].concat(values));
}
function generateSelectors(template2, state) {
  var stateSuffix = state ? ":" + state : "";
  return template2(stateSuffix);
}
function statefulSelectors(states, template2, stateMap2) {
  if (!template2)
    throw new PolishedError(67);
  if (states.length === 0)
    return generateSelectors(template2, null);
  var selectors = [];
  for (var i = 0; i < states.length; i += 1) {
    if (stateMap2 && stateMap2.indexOf(states[i]) < 0) {
      throw new PolishedError(68);
    }
    selectors.push(generateSelectors(template2, states[i]));
  }
  selectors = selectors.join(",");
  return selectors;
}
var stateMap$1 = [void 0, null, "active", "focus", "hover"];
function template$1(state) {
  return "button" + state + ',\n  input[type="button"]' + state + ',\n  input[type="reset"]' + state + ',\n  input[type="submit"]' + state;
}
function buttons() {
  for (var _len = arguments.length, states = new Array(_len), _key = 0; _key < _len; _key++) {
    states[_key] = arguments[_key];
  }
  return statefulSelectors(states, template$1, stateMap$1);
}
function margin() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }
  return directionalProperty.apply(void 0, ["margin"].concat(values));
}
function padding() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }
  return directionalProperty.apply(void 0, ["padding"].concat(values));
}
var positionMap = ["absolute", "fixed", "relative", "static", "sticky"];
function position(firstValue) {
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }
  if (positionMap.indexOf(firstValue) >= 0 && firstValue) {
    return _extends({}, directionalProperty.apply(void 0, [""].concat(values)), {
      position: firstValue
    });
  } else {
    return directionalProperty.apply(void 0, ["", firstValue].concat(values));
  }
}
function size(height, width) {
  if (width === void 0) {
    width = height;
  }
  return {
    height,
    width
  };
}
var stateMap = [void 0, null, "active", "focus", "hover"];
function template(state) {
  return 'input[type="color"]' + state + ',\n    input[type="date"]' + state + ',\n    input[type="datetime"]' + state + ',\n    input[type="datetime-local"]' + state + ',\n    input[type="email"]' + state + ',\n    input[type="month"]' + state + ',\n    input[type="number"]' + state + ',\n    input[type="password"]' + state + ',\n    input[type="search"]' + state + ',\n    input[type="tel"]' + state + ',\n    input[type="text"]' + state + ',\n    input[type="time"]' + state + ',\n    input[type="url"]' + state + ',\n    input[type="week"]' + state + ",\n    input:not([type])" + state + ",\n    textarea" + state;
}
function textInputs() {
  for (var _len = arguments.length, states = new Array(_len), _key = 0; _key < _len; _key++) {
    states[_key] = arguments[_key];
  }
  return statefulSelectors(states, template, stateMap);
}
function transitions() {
  for (var _len = arguments.length, properties = new Array(_len), _key = 0; _key < _len; _key++) {
    properties[_key] = arguments[_key];
  }
  if (Array.isArray(properties[0]) && properties.length === 2) {
    var value = properties[1];
    if (typeof value !== "string") {
      throw new PolishedError(61);
    }
    var transitionsString = properties[0].map(function(property) {
      return property + " " + value;
    }).join(", ");
    return {
      transition: transitionsString
    };
  } else {
    return {
      transition: properties.join(", ")
    };
  }
}

export {
  math,
  cssVar,
  directionalProperty,
  stripUnit,
  em$1,
  getValueAndUnit,
  important,
  modularScale,
  rem$1,
  remToPx,
  easeIn,
  easeInOut,
  easeOut,
  between,
  clearFix,
  cover,
  ellipsis,
  fluidRange,
  fontFace,
  hideText,
  hideVisually,
  hiDPI,
  linearGradient,
  normalize,
  radialGradient,
  retinaImage,
  timingFunctions,
  triangle,
  wordWrap,
  parseToRgb,
  parseToHsl,
  hsl,
  hsla,
  rgb,
  rgba,
  toColorString,
  curriedAdjustHue$1,
  complement,
  curriedDarken$1,
  curriedDesaturate$1,
  getLuminance,
  getContrast,
  grayscale,
  hslToColorString,
  invert,
  curriedLighten$1,
  meetsContrastGuidelines,
  mix$1,
  curriedOpacify$1,
  readableColor,
  rgbToColorString,
  curriedSaturate$1,
  curriedSetHue$1,
  curriedSetLightness$1,
  curriedSetSaturation$1,
  curriedShade$1,
  curriedTint$1,
  curriedTransparentize$1,
  animation,
  backgroundImages,
  backgrounds,
  border,
  borderColor,
  borderRadius,
  borderStyle,
  borderWidth,
  buttons,
  margin,
  padding,
  position,
  size,
  textInputs,
  transitions
};
//# sourceMappingURL=chunk-FM2H65RN.js.map
