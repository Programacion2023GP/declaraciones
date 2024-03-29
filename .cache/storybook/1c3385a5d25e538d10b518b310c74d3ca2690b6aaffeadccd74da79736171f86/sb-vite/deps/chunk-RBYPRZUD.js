import {
  require_estraverse
} from "./chunk-BE465WX2.js";
import {
  require_utils
} from "./chunk-HXAPWV7L.js";
import {
  __commonJS
} from "./chunk-WGAPYIUP.js";

// node_modules/escodegen/node_modules/source-map/lib/base64.js
var require_base64 = __commonJS({
  "node_modules/escodegen/node_modules/source-map/lib/base64.js"(exports) {
    var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    exports.encode = function(number) {
      if (0 <= number && number < intToCharMap.length) {
        return intToCharMap[number];
      }
      throw new TypeError("Must be between 0 and 63: " + number);
    };
    exports.decode = function(charCode) {
      var bigA = 65;
      var bigZ = 90;
      var littleA = 97;
      var littleZ = 122;
      var zero = 48;
      var nine = 57;
      var plus = 43;
      var slash = 47;
      var littleOffset = 26;
      var numberOffset = 52;
      if (bigA <= charCode && charCode <= bigZ) {
        return charCode - bigA;
      }
      if (littleA <= charCode && charCode <= littleZ) {
        return charCode - littleA + littleOffset;
      }
      if (zero <= charCode && charCode <= nine) {
        return charCode - zero + numberOffset;
      }
      if (charCode == plus) {
        return 62;
      }
      if (charCode == slash) {
        return 63;
      }
      return -1;
    };
  }
});

// node_modules/escodegen/node_modules/source-map/lib/base64-vlq.js
var require_base64_vlq = __commonJS({
  "node_modules/escodegen/node_modules/source-map/lib/base64-vlq.js"(exports) {
    var base64 = require_base64();
    var VLQ_BASE_SHIFT = 5;
    var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
    var VLQ_BASE_MASK = VLQ_BASE - 1;
    var VLQ_CONTINUATION_BIT = VLQ_BASE;
    function toVLQSigned(aValue) {
      return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
    }
    function fromVLQSigned(aValue) {
      var isNegative = (aValue & 1) === 1;
      var shifted = aValue >> 1;
      return isNegative ? -shifted : shifted;
    }
    exports.encode = function base64VLQ_encode(aValue) {
      var encoded = "";
      var digit;
      var vlq = toVLQSigned(aValue);
      do {
        digit = vlq & VLQ_BASE_MASK;
        vlq >>>= VLQ_BASE_SHIFT;
        if (vlq > 0) {
          digit |= VLQ_CONTINUATION_BIT;
        }
        encoded += base64.encode(digit);
      } while (vlq > 0);
      return encoded;
    };
    exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
      var strLen = aStr.length;
      var result = 0;
      var shift = 0;
      var continuation, digit;
      do {
        if (aIndex >= strLen) {
          throw new Error("Expected more digits in base 64 VLQ value.");
        }
        digit = base64.decode(aStr.charCodeAt(aIndex++));
        if (digit === -1) {
          throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
        }
        continuation = !!(digit & VLQ_CONTINUATION_BIT);
        digit &= VLQ_BASE_MASK;
        result = result + (digit << shift);
        shift += VLQ_BASE_SHIFT;
      } while (continuation);
      aOutParam.value = fromVLQSigned(result);
      aOutParam.rest = aIndex;
    };
  }
});

// node_modules/escodegen/node_modules/source-map/lib/util.js
var require_util = __commonJS({
  "node_modules/escodegen/node_modules/source-map/lib/util.js"(exports) {
    function getArg(aArgs, aName, aDefaultValue) {
      if (aName in aArgs) {
        return aArgs[aName];
      } else if (arguments.length === 3) {
        return aDefaultValue;
      } else {
        throw new Error('"' + aName + '" is a required argument.');
      }
    }
    exports.getArg = getArg;
    var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
    var dataUrlRegexp = /^data:.+\,.+$/;
    function urlParse(aUrl) {
      var match = aUrl.match(urlRegexp);
      if (!match) {
        return null;
      }
      return {
        scheme: match[1],
        auth: match[2],
        host: match[3],
        port: match[4],
        path: match[5]
      };
    }
    exports.urlParse = urlParse;
    function urlGenerate(aParsedUrl) {
      var url = "";
      if (aParsedUrl.scheme) {
        url += aParsedUrl.scheme + ":";
      }
      url += "//";
      if (aParsedUrl.auth) {
        url += aParsedUrl.auth + "@";
      }
      if (aParsedUrl.host) {
        url += aParsedUrl.host;
      }
      if (aParsedUrl.port) {
        url += ":" + aParsedUrl.port;
      }
      if (aParsedUrl.path) {
        url += aParsedUrl.path;
      }
      return url;
    }
    exports.urlGenerate = urlGenerate;
    function normalize(aPath) {
      var path = aPath;
      var url = urlParse(aPath);
      if (url) {
        if (!url.path) {
          return aPath;
        }
        path = url.path;
      }
      var isAbsolute = exports.isAbsolute(path);
      var parts = path.split(/\/+/);
      for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
        part = parts[i];
        if (part === ".") {
          parts.splice(i, 1);
        } else if (part === "..") {
          up++;
        } else if (up > 0) {
          if (part === "") {
            parts.splice(i + 1, up);
            up = 0;
          } else {
            parts.splice(i, 2);
            up--;
          }
        }
      }
      path = parts.join("/");
      if (path === "") {
        path = isAbsolute ? "/" : ".";
      }
      if (url) {
        url.path = path;
        return urlGenerate(url);
      }
      return path;
    }
    exports.normalize = normalize;
    function join(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      if (aPath === "") {
        aPath = ".";
      }
      var aPathUrl = urlParse(aPath);
      var aRootUrl = urlParse(aRoot);
      if (aRootUrl) {
        aRoot = aRootUrl.path || "/";
      }
      if (aPathUrl && !aPathUrl.scheme) {
        if (aRootUrl) {
          aPathUrl.scheme = aRootUrl.scheme;
        }
        return urlGenerate(aPathUrl);
      }
      if (aPathUrl || aPath.match(dataUrlRegexp)) {
        return aPath;
      }
      if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
        aRootUrl.host = aPath;
        return urlGenerate(aRootUrl);
      }
      var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
      if (aRootUrl) {
        aRootUrl.path = joined;
        return urlGenerate(aRootUrl);
      }
      return joined;
    }
    exports.join = join;
    exports.isAbsolute = function(aPath) {
      return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
    };
    function relative(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      aRoot = aRoot.replace(/\/$/, "");
      var level = 0;
      while (aPath.indexOf(aRoot + "/") !== 0) {
        var index = aRoot.lastIndexOf("/");
        if (index < 0) {
          return aPath;
        }
        aRoot = aRoot.slice(0, index);
        if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
          return aPath;
        }
        ++level;
      }
      return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
    }
    exports.relative = relative;
    var supportsNullProto = function() {
      var obj = /* @__PURE__ */ Object.create(null);
      return !("__proto__" in obj);
    }();
    function identity(s) {
      return s;
    }
    function toSetString(aStr) {
      if (isProtoString(aStr)) {
        return "$" + aStr;
      }
      return aStr;
    }
    exports.toSetString = supportsNullProto ? identity : toSetString;
    function fromSetString(aStr) {
      if (isProtoString(aStr)) {
        return aStr.slice(1);
      }
      return aStr;
    }
    exports.fromSetString = supportsNullProto ? identity : fromSetString;
    function isProtoString(s) {
      if (!s) {
        return false;
      }
      var length = s.length;
      if (length < 9) {
        return false;
      }
      if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) {
        return false;
      }
      for (var i = length - 10; i >= 0; i--) {
        if (s.charCodeAt(i) !== 36) {
          return false;
        }
      }
      return true;
    }
    function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
      var cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0 || onlyCompareOriginal) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByOriginalPositions = compareByOriginalPositions;
    function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0 || onlyCompareGenerated) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
    function strcmp(aStr1, aStr2) {
      if (aStr1 === aStr2) {
        return 0;
      }
      if (aStr1 === null) {
        return 1;
      }
      if (aStr2 === null) {
        return -1;
      }
      if (aStr1 > aStr2) {
        return 1;
      }
      return -1;
    }
    function compareByGeneratedPositionsInflated(mappingA, mappingB) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
    function parseSourceMapInput(str) {
      return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
    }
    exports.parseSourceMapInput = parseSourceMapInput;
    function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
      sourceURL = sourceURL || "";
      if (sourceRoot) {
        if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") {
          sourceRoot += "/";
        }
        sourceURL = sourceRoot + sourceURL;
      }
      if (sourceMapURL) {
        var parsed = urlParse(sourceMapURL);
        if (!parsed) {
          throw new Error("sourceMapURL could not be parsed");
        }
        if (parsed.path) {
          var index = parsed.path.lastIndexOf("/");
          if (index >= 0) {
            parsed.path = parsed.path.substring(0, index + 1);
          }
        }
        sourceURL = join(urlGenerate(parsed), sourceURL);
      }
      return normalize(sourceURL);
    }
    exports.computeSourceURL = computeSourceURL;
  }
});

// node_modules/escodegen/node_modules/source-map/lib/array-set.js
var require_array_set = __commonJS({
  "node_modules/escodegen/node_modules/source-map/lib/array-set.js"(exports) {
    var util = require_util();
    var has = Object.prototype.hasOwnProperty;
    var hasNativeMap = typeof Map !== "undefined";
    function ArraySet() {
      this._array = [];
      this._set = hasNativeMap ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
    }
    ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
      var set = new ArraySet();
      for (var i = 0, len = aArray.length; i < len; i++) {
        set.add(aArray[i], aAllowDuplicates);
      }
      return set;
    };
    ArraySet.prototype.size = function ArraySet_size() {
      return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
    };
    ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
      var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
      var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
      var idx = this._array.length;
      if (!isDuplicate || aAllowDuplicates) {
        this._array.push(aStr);
      }
      if (!isDuplicate) {
        if (hasNativeMap) {
          this._set.set(aStr, idx);
        } else {
          this._set[sStr] = idx;
        }
      }
    };
    ArraySet.prototype.has = function ArraySet_has(aStr) {
      if (hasNativeMap) {
        return this._set.has(aStr);
      } else {
        var sStr = util.toSetString(aStr);
        return has.call(this._set, sStr);
      }
    };
    ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
      if (hasNativeMap) {
        var idx = this._set.get(aStr);
        if (idx >= 0) {
          return idx;
        }
      } else {
        var sStr = util.toSetString(aStr);
        if (has.call(this._set, sStr)) {
          return this._set[sStr];
        }
      }
      throw new Error('"' + aStr + '" is not in the set.');
    };
    ArraySet.prototype.at = function ArraySet_at(aIdx) {
      if (aIdx >= 0 && aIdx < this._array.length) {
        return this._array[aIdx];
      }
      throw new Error("No element indexed by " + aIdx);
    };
    ArraySet.prototype.toArray = function ArraySet_toArray() {
      return this._array.slice();
    };
    exports.ArraySet = ArraySet;
  }
});

// node_modules/escodegen/node_modules/source-map/lib/mapping-list.js
var require_mapping_list = __commonJS({
  "node_modules/escodegen/node_modules/source-map/lib/mapping-list.js"(exports) {
    var util = require_util();
    function generatedPositionAfter(mappingA, mappingB) {
      var lineA = mappingA.generatedLine;
      var lineB = mappingB.generatedLine;
      var columnA = mappingA.generatedColumn;
      var columnB = mappingB.generatedColumn;
      return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
    }
    function MappingList() {
      this._array = [];
      this._sorted = true;
      this._last = { generatedLine: -1, generatedColumn: 0 };
    }
    MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
      this._array.forEach(aCallback, aThisArg);
    };
    MappingList.prototype.add = function MappingList_add(aMapping) {
      if (generatedPositionAfter(this._last, aMapping)) {
        this._last = aMapping;
        this._array.push(aMapping);
      } else {
        this._sorted = false;
        this._array.push(aMapping);
      }
    };
    MappingList.prototype.toArray = function MappingList_toArray() {
      if (!this._sorted) {
        this._array.sort(util.compareByGeneratedPositionsInflated);
        this._sorted = true;
      }
      return this._array;
    };
    exports.MappingList = MappingList;
  }
});

// node_modules/escodegen/node_modules/source-map/lib/source-map-generator.js
var require_source_map_generator = __commonJS({
  "node_modules/escodegen/node_modules/source-map/lib/source-map-generator.js"(exports) {
    var base64VLQ = require_base64_vlq();
    var util = require_util();
    var ArraySet = require_array_set().ArraySet;
    var MappingList = require_mapping_list().MappingList;
    function SourceMapGenerator(aArgs) {
      if (!aArgs) {
        aArgs = {};
      }
      this._file = util.getArg(aArgs, "file", null);
      this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
      this._skipValidation = util.getArg(aArgs, "skipValidation", false);
      this._sources = new ArraySet();
      this._names = new ArraySet();
      this._mappings = new MappingList();
      this._sourcesContents = null;
    }
    SourceMapGenerator.prototype._version = 3;
    SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
      var sourceRoot = aSourceMapConsumer.sourceRoot;
      var generator = new SourceMapGenerator({
        file: aSourceMapConsumer.file,
        sourceRoot
      });
      aSourceMapConsumer.eachMapping(function(mapping) {
        var newMapping = {
          generated: {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
          }
        };
        if (mapping.source != null) {
          newMapping.source = mapping.source;
          if (sourceRoot != null) {
            newMapping.source = util.relative(sourceRoot, newMapping.source);
          }
          newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          };
          if (mapping.name != null) {
            newMapping.name = mapping.name;
          }
        }
        generator.addMapping(newMapping);
      });
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var sourceRelative = sourceFile;
        if (sourceRoot !== null) {
          sourceRelative = util.relative(sourceRoot, sourceFile);
        }
        if (!generator._sources.has(sourceRelative)) {
          generator._sources.add(sourceRelative);
        }
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          generator.setSourceContent(sourceFile, content);
        }
      });
      return generator;
    };
    SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
      var generated = util.getArg(aArgs, "generated");
      var original = util.getArg(aArgs, "original", null);
      var source = util.getArg(aArgs, "source", null);
      var name = util.getArg(aArgs, "name", null);
      if (!this._skipValidation) {
        this._validateMapping(generated, original, source, name);
      }
      if (source != null) {
        source = String(source);
        if (!this._sources.has(source)) {
          this._sources.add(source);
        }
      }
      if (name != null) {
        name = String(name);
        if (!this._names.has(name)) {
          this._names.add(name);
        }
      }
      this._mappings.add({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source,
        name
      });
    };
    SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
      var source = aSourceFile;
      if (this._sourceRoot != null) {
        source = util.relative(this._sourceRoot, source);
      }
      if (aSourceContent != null) {
        if (!this._sourcesContents) {
          this._sourcesContents = /* @__PURE__ */ Object.create(null);
        }
        this._sourcesContents[util.toSetString(source)] = aSourceContent;
      } else if (this._sourcesContents) {
        delete this._sourcesContents[util.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null;
        }
      }
    };
    SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
      var sourceFile = aSourceFile;
      if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) {
          throw new Error(
            `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
          );
        }
        sourceFile = aSourceMapConsumer.file;
      }
      var sourceRoot = this._sourceRoot;
      if (sourceRoot != null) {
        sourceFile = util.relative(sourceRoot, sourceFile);
      }
      var newSources = new ArraySet();
      var newNames = new ArraySet();
      this._mappings.unsortedForEach(function(mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
          var original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          });
          if (original.source != null) {
            mapping.source = original.source;
            if (aSourceMapPath != null) {
              mapping.source = util.join(aSourceMapPath, mapping.source);
            }
            if (sourceRoot != null) {
              mapping.source = util.relative(sourceRoot, mapping.source);
            }
            mapping.originalLine = original.line;
            mapping.originalColumn = original.column;
            if (original.name != null) {
              mapping.name = original.name;
            }
          }
        }
        var source = mapping.source;
        if (source != null && !newSources.has(source)) {
          newSources.add(source);
        }
        var name = mapping.name;
        if (name != null && !newNames.has(name)) {
          newNames.add(name);
        }
      }, this);
      this._sources = newSources;
      this._names = newNames;
      aSourceMapConsumer.sources.forEach(function(sourceFile2) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile2);
        if (content != null) {
          if (aSourceMapPath != null) {
            sourceFile2 = util.join(aSourceMapPath, sourceFile2);
          }
          if (sourceRoot != null) {
            sourceFile2 = util.relative(sourceRoot, sourceFile2);
          }
          this.setSourceContent(sourceFile2, content);
        }
      }, this);
    };
    SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
      if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
        throw new Error(
          "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
        );
      }
      if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
        return;
      } else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
        return;
      } else {
        throw new Error("Invalid mapping: " + JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        }));
      }
    };
    SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
      var previousGeneratedColumn = 0;
      var previousGeneratedLine = 1;
      var previousOriginalColumn = 0;
      var previousOriginalLine = 0;
      var previousName = 0;
      var previousSource = 0;
      var result = "";
      var next;
      var mapping;
      var nameIdx;
      var sourceIdx;
      var mappings = this._mappings.toArray();
      for (var i = 0, len = mappings.length; i < len; i++) {
        mapping = mappings[i];
        next = "";
        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generatedLine !== previousGeneratedLine) {
            next += ";";
            previousGeneratedLine++;
          }
        } else {
          if (i > 0) {
            if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
              continue;
            }
            next += ",";
          }
        }
        next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;
        if (mapping.source != null) {
          sourceIdx = this._sources.indexOf(mapping.source);
          next += base64VLQ.encode(sourceIdx - previousSource);
          previousSource = sourceIdx;
          next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
          previousOriginalLine = mapping.originalLine - 1;
          next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
          previousOriginalColumn = mapping.originalColumn;
          if (mapping.name != null) {
            nameIdx = this._names.indexOf(mapping.name);
            next += base64VLQ.encode(nameIdx - previousName);
            previousName = nameIdx;
          }
        }
        result += next;
      }
      return result;
    };
    SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
      return aSources.map(function(source) {
        if (!this._sourcesContents) {
          return null;
        }
        if (aSourceRoot != null) {
          source = util.relative(aSourceRoot, source);
        }
        var key = util.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
      }, this);
    };
    SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
      var map = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      if (this._file != null) {
        map.file = this._file;
      }
      if (this._sourceRoot != null) {
        map.sourceRoot = this._sourceRoot;
      }
      if (this._sourcesContents) {
        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
      }
      return map;
    };
    SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
      return JSON.stringify(this.toJSON());
    };
    exports.SourceMapGenerator = SourceMapGenerator;
  }
});

// node_modules/escodegen/node_modules/source-map/lib/binary-search.js
var require_binary_search = __commonJS({
  "node_modules/escodegen/node_modules/source-map/lib/binary-search.js"(exports) {
    exports.GREATEST_LOWER_BOUND = 1;
    exports.LEAST_UPPER_BOUND = 2;
    function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
      var mid = Math.floor((aHigh - aLow) / 2) + aLow;
      var cmp = aCompare(aNeedle, aHaystack[mid], true);
      if (cmp === 0) {
        return mid;
      } else if (cmp > 0) {
        if (aHigh - mid > 1) {
          return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports.LEAST_UPPER_BOUND) {
          return aHigh < aHaystack.length ? aHigh : -1;
        } else {
          return mid;
        }
      } else {
        if (mid - aLow > 1) {
          return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports.LEAST_UPPER_BOUND) {
          return mid;
        } else {
          return aLow < 0 ? -1 : aLow;
        }
      }
    }
    exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
      if (aHaystack.length === 0) {
        return -1;
      }
      var index = recursiveSearch(
        -1,
        aHaystack.length,
        aNeedle,
        aHaystack,
        aCompare,
        aBias || exports.GREATEST_LOWER_BOUND
      );
      if (index < 0) {
        return -1;
      }
      while (index - 1 >= 0) {
        if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
          break;
        }
        --index;
      }
      return index;
    };
  }
});

// node_modules/escodegen/node_modules/source-map/lib/quick-sort.js
var require_quick_sort = __commonJS({
  "node_modules/escodegen/node_modules/source-map/lib/quick-sort.js"(exports) {
    function swap(ary, x, y) {
      var temp = ary[x];
      ary[x] = ary[y];
      ary[y] = temp;
    }
    function randomIntInRange(low, high) {
      return Math.round(low + Math.random() * (high - low));
    }
    function doQuickSort(ary, comparator, p, r) {
      if (p < r) {
        var pivotIndex = randomIntInRange(p, r);
        var i = p - 1;
        swap(ary, pivotIndex, r);
        var pivot = ary[r];
        for (var j = p; j < r; j++) {
          if (comparator(ary[j], pivot) <= 0) {
            i += 1;
            swap(ary, i, j);
          }
        }
        swap(ary, i + 1, j);
        var q = i + 1;
        doQuickSort(ary, comparator, p, q - 1);
        doQuickSort(ary, comparator, q + 1, r);
      }
    }
    exports.quickSort = function(ary, comparator) {
      doQuickSort(ary, comparator, 0, ary.length - 1);
    };
  }
});

// node_modules/escodegen/node_modules/source-map/lib/source-map-consumer.js
var require_source_map_consumer = __commonJS({
  "node_modules/escodegen/node_modules/source-map/lib/source-map-consumer.js"(exports) {
    var util = require_util();
    var binarySearch = require_binary_search();
    var ArraySet = require_array_set().ArraySet;
    var base64VLQ = require_base64_vlq();
    var quickSort = require_quick_sort().quickSort;
    function SourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
    }
    SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
      return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
    };
    SourceMapConsumer.prototype._version = 3;
    SourceMapConsumer.prototype.__generatedMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        if (!this.__generatedMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__generatedMappings;
      }
    });
    SourceMapConsumer.prototype.__originalMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        if (!this.__originalMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__originalMappings;
      }
    });
    SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
      var c = aStr.charAt(index);
      return c === ";" || c === ",";
    };
    SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      throw new Error("Subclasses must implement _parseMappings");
    };
    SourceMapConsumer.GENERATED_ORDER = 1;
    SourceMapConsumer.ORIGINAL_ORDER = 2;
    SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
    SourceMapConsumer.LEAST_UPPER_BOUND = 2;
    SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
      var context = aContext || null;
      var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
      var mappings;
      switch (order) {
        case SourceMapConsumer.GENERATED_ORDER:
          mappings = this._generatedMappings;
          break;
        case SourceMapConsumer.ORIGINAL_ORDER:
          mappings = this._originalMappings;
          break;
        default:
          throw new Error("Unknown order of iteration.");
      }
      var sourceRoot = this.sourceRoot;
      mappings.map(function(mapping) {
        var source = mapping.source === null ? null : this._sources.at(mapping.source);
        source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
        return {
          source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name === null ? null : this._names.at(mapping.name)
        };
      }, this).forEach(aCallback, context);
    };
    SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
      var line = util.getArg(aArgs, "line");
      var needle = {
        source: util.getArg(aArgs, "source"),
        originalLine: line,
        originalColumn: util.getArg(aArgs, "column", 0)
      };
      needle.source = this._findSourceIndex(needle.source);
      if (needle.source < 0) {
        return [];
      }
      var mappings = [];
      var index = this._findMapping(
        needle,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        util.compareByOriginalPositions,
        binarySearch.LEAST_UPPER_BOUND
      );
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (aArgs.column === void 0) {
          var originalLine = mapping.originalLine;
          while (mapping && mapping.originalLine === originalLine) {
            mappings.push({
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index];
          }
        } else {
          var originalColumn = mapping.originalColumn;
          while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
            mappings.push({
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index];
          }
        }
      }
      return mappings;
    };
    exports.SourceMapConsumer = SourceMapConsumer;
    function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      var version = util.getArg(sourceMap, "version");
      var sources = util.getArg(sourceMap, "sources");
      var names = util.getArg(sourceMap, "names", []);
      var sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
      var sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
      var mappings = util.getArg(sourceMap, "mappings");
      var file = util.getArg(sourceMap, "file", null);
      if (version != this._version) {
        throw new Error("Unsupported version: " + version);
      }
      if (sourceRoot) {
        sourceRoot = util.normalize(sourceRoot);
      }
      sources = sources.map(String).map(util.normalize).map(function(source) {
        return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
      });
      this._names = ArraySet.fromArray(names.map(String), true);
      this._sources = ArraySet.fromArray(sources, true);
      this._absoluteSources = this._sources.toArray().map(function(s) {
        return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
      });
      this.sourceRoot = sourceRoot;
      this.sourcesContent = sourcesContent;
      this._mappings = mappings;
      this._sourceMapURL = aSourceMapURL;
      this.file = file;
    }
    BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
    BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util.relative(this.sourceRoot, relativeSource);
      }
      if (this._sources.has(relativeSource)) {
        return this._sources.indexOf(relativeSource);
      }
      var i;
      for (i = 0; i < this._absoluteSources.length; ++i) {
        if (this._absoluteSources[i] == aSource) {
          return i;
        }
      }
      return -1;
    };
    BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
      var smc = Object.create(BasicSourceMapConsumer.prototype);
      var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
      var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
      smc.sourceRoot = aSourceMap._sourceRoot;
      smc.sourcesContent = aSourceMap._generateSourcesContent(
        smc._sources.toArray(),
        smc.sourceRoot
      );
      smc.file = aSourceMap._file;
      smc._sourceMapURL = aSourceMapURL;
      smc._absoluteSources = smc._sources.toArray().map(function(s) {
        return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
      });
      var generatedMappings = aSourceMap._mappings.toArray().slice();
      var destGeneratedMappings = smc.__generatedMappings = [];
      var destOriginalMappings = smc.__originalMappings = [];
      for (var i = 0, length = generatedMappings.length; i < length; i++) {
        var srcMapping = generatedMappings[i];
        var destMapping = new Mapping();
        destMapping.generatedLine = srcMapping.generatedLine;
        destMapping.generatedColumn = srcMapping.generatedColumn;
        if (srcMapping.source) {
          destMapping.source = sources.indexOf(srcMapping.source);
          destMapping.originalLine = srcMapping.originalLine;
          destMapping.originalColumn = srcMapping.originalColumn;
          if (srcMapping.name) {
            destMapping.name = names.indexOf(srcMapping.name);
          }
          destOriginalMappings.push(destMapping);
        }
        destGeneratedMappings.push(destMapping);
      }
      quickSort(smc.__originalMappings, util.compareByOriginalPositions);
      return smc;
    };
    BasicSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", {
      get: function() {
        return this._absoluteSources.slice();
      }
    });
    function Mapping() {
      this.generatedLine = 0;
      this.generatedColumn = 0;
      this.source = null;
      this.originalLine = null;
      this.originalColumn = null;
      this.name = null;
    }
    BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      var generatedLine = 1;
      var previousGeneratedColumn = 0;
      var previousOriginalLine = 0;
      var previousOriginalColumn = 0;
      var previousSource = 0;
      var previousName = 0;
      var length = aStr.length;
      var index = 0;
      var cachedSegments = {};
      var temp = {};
      var originalMappings = [];
      var generatedMappings = [];
      var mapping, str, segment, end, value;
      while (index < length) {
        if (aStr.charAt(index) === ";") {
          generatedLine++;
          index++;
          previousGeneratedColumn = 0;
        } else if (aStr.charAt(index) === ",") {
          index++;
        } else {
          mapping = new Mapping();
          mapping.generatedLine = generatedLine;
          for (end = index; end < length; end++) {
            if (this._charIsMappingSeparator(aStr, end)) {
              break;
            }
          }
          str = aStr.slice(index, end);
          segment = cachedSegments[str];
          if (segment) {
            index += str.length;
          } else {
            segment = [];
            while (index < end) {
              base64VLQ.decode(aStr, index, temp);
              value = temp.value;
              index = temp.rest;
              segment.push(value);
            }
            if (segment.length === 2) {
              throw new Error("Found a source, but no line and column");
            }
            if (segment.length === 3) {
              throw new Error("Found a source and line, but no column");
            }
            cachedSegments[str] = segment;
          }
          mapping.generatedColumn = previousGeneratedColumn + segment[0];
          previousGeneratedColumn = mapping.generatedColumn;
          if (segment.length > 1) {
            mapping.source = previousSource + segment[1];
            previousSource += segment[1];
            mapping.originalLine = previousOriginalLine + segment[2];
            previousOriginalLine = mapping.originalLine;
            mapping.originalLine += 1;
            mapping.originalColumn = previousOriginalColumn + segment[3];
            previousOriginalColumn = mapping.originalColumn;
            if (segment.length > 4) {
              mapping.name = previousName + segment[4];
              previousName += segment[4];
            }
          }
          generatedMappings.push(mapping);
          if (typeof mapping.originalLine === "number") {
            originalMappings.push(mapping);
          }
        }
      }
      quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
      this.__generatedMappings = generatedMappings;
      quickSort(originalMappings, util.compareByOriginalPositions);
      this.__originalMappings = originalMappings;
    };
    BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
      if (aNeedle[aLineName] <= 0) {
        throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
      }
      return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
    };
    BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
      for (var index = 0; index < this._generatedMappings.length; ++index) {
        var mapping = this._generatedMappings[index];
        if (index + 1 < this._generatedMappings.length) {
          var nextMapping = this._generatedMappings[index + 1];
          if (mapping.generatedLine === nextMapping.generatedLine) {
            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
            continue;
          }
        }
        mapping.lastGeneratedColumn = Infinity;
      }
    };
    BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, "line"),
        generatedColumn: util.getArg(aArgs, "column")
      };
      var index = this._findMapping(
        needle,
        this._generatedMappings,
        "generatedLine",
        "generatedColumn",
        util.compareByGeneratedPositionsDeflated,
        util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND)
      );
      if (index >= 0) {
        var mapping = this._generatedMappings[index];
        if (mapping.generatedLine === needle.generatedLine) {
          var source = util.getArg(mapping, "source", null);
          if (source !== null) {
            source = this._sources.at(source);
            source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
          }
          var name = util.getArg(mapping, "name", null);
          if (name !== null) {
            name = this._names.at(name);
          }
          return {
            source,
            line: util.getArg(mapping, "originalLine", null),
            column: util.getArg(mapping, "originalColumn", null),
            name
          };
        }
      }
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    };
    BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
      if (!this.sourcesContent) {
        return false;
      }
      return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
        return sc == null;
      });
    };
    BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      if (!this.sourcesContent) {
        return null;
      }
      var index = this._findSourceIndex(aSource);
      if (index >= 0) {
        return this.sourcesContent[index];
      }
      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util.relative(this.sourceRoot, relativeSource);
      }
      var url;
      if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
        var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
        if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) {
          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
        }
        if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource)) {
          return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
        }
      }
      if (nullOnMissing) {
        return null;
      } else {
        throw new Error('"' + relativeSource + '" is not in the SourceMap.');
      }
    };
    BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
      var source = util.getArg(aArgs, "source");
      source = this._findSourceIndex(source);
      if (source < 0) {
        return {
          line: null,
          column: null,
          lastColumn: null
        };
      }
      var needle = {
        source,
        originalLine: util.getArg(aArgs, "line"),
        originalColumn: util.getArg(aArgs, "column")
      };
      var index = this._findMapping(
        needle,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        util.compareByOriginalPositions,
        util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND)
      );
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (mapping.source === needle.source) {
          return {
            line: util.getArg(mapping, "generatedLine", null),
            column: util.getArg(mapping, "generatedColumn", null),
            lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
          };
        }
      }
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    };
    exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
    function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      var version = util.getArg(sourceMap, "version");
      var sections = util.getArg(sourceMap, "sections");
      if (version != this._version) {
        throw new Error("Unsupported version: " + version);
      }
      this._sources = new ArraySet();
      this._names = new ArraySet();
      var lastOffset = {
        line: -1,
        column: 0
      };
      this._sections = sections.map(function(s) {
        if (s.url) {
          throw new Error("Support for url field in sections not implemented.");
        }
        var offset = util.getArg(s, "offset");
        var offsetLine = util.getArg(offset, "line");
        var offsetColumn = util.getArg(offset, "column");
        if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
          throw new Error("Section offsets must be ordered and non-overlapping.");
        }
        lastOffset = offset;
        return {
          generatedOffset: {
            // The offset fields are 0-based, but we use 1-based indices when
            // encoding/decoding from VLQ.
            generatedLine: offsetLine + 1,
            generatedColumn: offsetColumn + 1
          },
          consumer: new SourceMapConsumer(util.getArg(s, "map"), aSourceMapURL)
        };
      });
    }
    IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
    IndexedSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", {
      get: function() {
        var sources = [];
        for (var i = 0; i < this._sections.length; i++) {
          for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
            sources.push(this._sections[i].consumer.sources[j]);
          }
        }
        return sources;
      }
    });
    IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, "line"),
        generatedColumn: util.getArg(aArgs, "column")
      };
      var sectionIndex = binarySearch.search(
        needle,
        this._sections,
        function(needle2, section2) {
          var cmp = needle2.generatedLine - section2.generatedOffset.generatedLine;
          if (cmp) {
            return cmp;
          }
          return needle2.generatedColumn - section2.generatedOffset.generatedColumn;
        }
      );
      var section = this._sections[sectionIndex];
      if (!section) {
        return {
          source: null,
          line: null,
          column: null,
          name: null
        };
      }
      return section.consumer.originalPositionFor({
        line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
        column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
        bias: aArgs.bias
      });
    };
    IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
      return this._sections.every(function(s) {
        return s.consumer.hasContentsOfAllSources();
      });
    };
    IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var content = section.consumer.sourceContentFor(aSource, true);
        if (content) {
          return content;
        }
      }
      if (nullOnMissing) {
        return null;
      } else {
        throw new Error('"' + aSource + '" is not in the SourceMap.');
      }
    };
    IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        if (section.consumer._findSourceIndex(util.getArg(aArgs, "source")) === -1) {
          continue;
        }
        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
        if (generatedPosition) {
          var ret = {
            line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
            column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
          };
          return ret;
        }
      }
      return {
        line: null,
        column: null
      };
    };
    IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      this.__generatedMappings = [];
      this.__originalMappings = [];
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var sectionMappings = section.consumer._generatedMappings;
        for (var j = 0; j < sectionMappings.length; j++) {
          var mapping = sectionMappings[j];
          var source = section.consumer._sources.at(mapping.source);
          source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
          this._sources.add(source);
          source = this._sources.indexOf(source);
          var name = null;
          if (mapping.name) {
            name = section.consumer._names.at(mapping.name);
            this._names.add(name);
            name = this._names.indexOf(name);
          }
          var adjustedMapping = {
            source,
            generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
            generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name
          };
          this.__generatedMappings.push(adjustedMapping);
          if (typeof adjustedMapping.originalLine === "number") {
            this.__originalMappings.push(adjustedMapping);
          }
        }
      }
      quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
      quickSort(this.__originalMappings, util.compareByOriginalPositions);
    };
    exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
  }
});

// node_modules/escodegen/node_modules/source-map/lib/source-node.js
var require_source_node = __commonJS({
  "node_modules/escodegen/node_modules/source-map/lib/source-node.js"(exports) {
    var SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
    var util = require_util();
    var REGEX_NEWLINE = /(\r?\n)/;
    var NEWLINE_CODE = 10;
    var isSourceNode = "$$$isSourceNode$$$";
    function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
      this.children = [];
      this.sourceContents = {};
      this.line = aLine == null ? null : aLine;
      this.column = aColumn == null ? null : aColumn;
      this.source = aSource == null ? null : aSource;
      this.name = aName == null ? null : aName;
      this[isSourceNode] = true;
      if (aChunks != null)
        this.add(aChunks);
    }
    SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
      var node = new SourceNode();
      var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
      var remainingLinesIndex = 0;
      var shiftNextLine = function() {
        var lineContents = getNextLine();
        var newLine = getNextLine() || "";
        return lineContents + newLine;
        function getNextLine() {
          return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
        }
      };
      var lastGeneratedLine = 1, lastGeneratedColumn = 0;
      var lastMapping = null;
      aSourceMapConsumer.eachMapping(function(mapping) {
        if (lastMapping !== null) {
          if (lastGeneratedLine < mapping.generatedLine) {
            addMappingWithCode(lastMapping, shiftNextLine());
            lastGeneratedLine++;
            lastGeneratedColumn = 0;
          } else {
            var nextLine = remainingLines[remainingLinesIndex] || "";
            var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
            remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
            addMappingWithCode(lastMapping, code);
            lastMapping = mapping;
            return;
          }
        }
        while (lastGeneratedLine < mapping.generatedLine) {
          node.add(shiftNextLine());
          lastGeneratedLine++;
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
          var nextLine = remainingLines[remainingLinesIndex] || "";
          node.add(nextLine.substr(0, mapping.generatedColumn));
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
        }
        lastMapping = mapping;
      }, this);
      if (remainingLinesIndex < remainingLines.length) {
        if (lastMapping) {
          addMappingWithCode(lastMapping, shiftNextLine());
        }
        node.add(remainingLines.splice(remainingLinesIndex).join(""));
      }
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aRelativePath != null) {
            sourceFile = util.join(aRelativePath, sourceFile);
          }
          node.setSourceContent(sourceFile, content);
        }
      });
      return node;
      function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === void 0) {
          node.add(code);
        } else {
          var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
          node.add(new SourceNode(
            mapping.originalLine,
            mapping.originalColumn,
            source,
            code,
            mapping.name
          ));
        }
      }
    };
    SourceNode.prototype.add = function SourceNode_add(aChunk) {
      if (Array.isArray(aChunk)) {
        aChunk.forEach(function(chunk) {
          this.add(chunk);
        }, this);
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        if (aChunk) {
          this.children.push(aChunk);
        }
      } else {
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
        );
      }
      return this;
    };
    SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
      if (Array.isArray(aChunk)) {
        for (var i = aChunk.length - 1; i >= 0; i--) {
          this.prepend(aChunk[i]);
        }
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        this.children.unshift(aChunk);
      } else {
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
        );
      }
      return this;
    };
    SourceNode.prototype.walk = function SourceNode_walk(aFn) {
      var chunk;
      for (var i = 0, len = this.children.length; i < len; i++) {
        chunk = this.children[i];
        if (chunk[isSourceNode]) {
          chunk.walk(aFn);
        } else {
          if (chunk !== "") {
            aFn(chunk, {
              source: this.source,
              line: this.line,
              column: this.column,
              name: this.name
            });
          }
        }
      }
    };
    SourceNode.prototype.join = function SourceNode_join(aSep) {
      var newChildren;
      var i;
      var len = this.children.length;
      if (len > 0) {
        newChildren = [];
        for (i = 0; i < len - 1; i++) {
          newChildren.push(this.children[i]);
          newChildren.push(aSep);
        }
        newChildren.push(this.children[i]);
        this.children = newChildren;
      }
      return this;
    };
    SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
      var lastChild = this.children[this.children.length - 1];
      if (lastChild[isSourceNode]) {
        lastChild.replaceRight(aPattern, aReplacement);
      } else if (typeof lastChild === "string") {
        this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
      } else {
        this.children.push("".replace(aPattern, aReplacement));
      }
      return this;
    };
    SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
    };
    SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
      for (var i = 0, len = this.children.length; i < len; i++) {
        if (this.children[i][isSourceNode]) {
          this.children[i].walkSourceContents(aFn);
        }
      }
      var sources = Object.keys(this.sourceContents);
      for (var i = 0, len = sources.length; i < len; i++) {
        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
      }
    };
    SourceNode.prototype.toString = function SourceNode_toString() {
      var str = "";
      this.walk(function(chunk) {
        str += chunk;
      });
      return str;
    };
    SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
      var generated = {
        code: "",
        line: 1,
        column: 0
      };
      var map = new SourceMapGenerator(aArgs);
      var sourceMappingActive = false;
      var lastOriginalSource = null;
      var lastOriginalLine = null;
      var lastOriginalColumn = null;
      var lastOriginalName = null;
      this.walk(function(chunk, original) {
        generated.code += chunk;
        if (original.source !== null && original.line !== null && original.column !== null) {
          if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            });
          }
          lastOriginalSource = original.source;
          lastOriginalLine = original.line;
          lastOriginalColumn = original.column;
          lastOriginalName = original.name;
          sourceMappingActive = true;
        } else if (sourceMappingActive) {
          map.addMapping({
            generated: {
              line: generated.line,
              column: generated.column
            }
          });
          lastOriginalSource = null;
          sourceMappingActive = false;
        }
        for (var idx = 0, length = chunk.length; idx < length; idx++) {
          if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
            generated.line++;
            generated.column = 0;
            if (idx + 1 === length) {
              lastOriginalSource = null;
              sourceMappingActive = false;
            } else if (sourceMappingActive) {
              map.addMapping({
                source: original.source,
                original: {
                  line: original.line,
                  column: original.column
                },
                generated: {
                  line: generated.line,
                  column: generated.column
                },
                name: original.name
              });
            }
          } else {
            generated.column++;
          }
        }
      });
      this.walkSourceContents(function(sourceFile, sourceContent) {
        map.setSourceContent(sourceFile, sourceContent);
      });
      return { code: generated.code, map };
    };
    exports.SourceNode = SourceNode;
  }
});

// node_modules/escodegen/node_modules/source-map/source-map.js
var require_source_map = __commonJS({
  "node_modules/escodegen/node_modules/source-map/source-map.js"(exports) {
    exports.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
    exports.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
    exports.SourceNode = require_source_node().SourceNode;
  }
});

// node_modules/escodegen/package.json
var require_package = __commonJS({
  "node_modules/escodegen/package.json"(exports, module) {
    module.exports = {
      name: "escodegen",
      description: "ECMAScript code generator",
      homepage: "http://github.com/estools/escodegen",
      main: "escodegen.js",
      bin: {
        esgenerate: "./bin/esgenerate.js",
        escodegen: "./bin/escodegen.js"
      },
      files: [
        "LICENSE.BSD",
        "README.md",
        "bin",
        "escodegen.js",
        "package.json"
      ],
      version: "2.1.0",
      engines: {
        node: ">=6.0"
      },
      maintainers: [
        {
          name: "Yusuke Suzuki",
          email: "utatane.tea@gmail.com",
          web: "http://github.com/Constellation"
        }
      ],
      repository: {
        type: "git",
        url: "http://github.com/estools/escodegen.git"
      },
      dependencies: {
        estraverse: "^5.2.0",
        esutils: "^2.0.2",
        esprima: "^4.0.1"
      },
      optionalDependencies: {
        "source-map": "~0.6.1"
      },
      devDependencies: {
        acorn: "^8.0.4",
        bluebird: "^3.4.7",
        "bower-registry-client": "^1.0.0",
        chai: "^4.2.0",
        "chai-exclude": "^2.0.2",
        "commonjs-everywhere": "^0.9.7",
        gulp: "^4.0.2",
        "gulp-eslint": "^6.0.0",
        "gulp-mocha": "^7.0.2",
        minimist: "^1.2.5",
        optionator: "^0.9.1",
        semver: "^7.3.4"
      },
      license: "BSD-2-Clause",
      scripts: {
        test: "gulp travis",
        "unit-test": "gulp test",
        lint: "gulp lint",
        release: "node tools/release.js",
        "build-min": "./node_modules/.bin/cjsify -ma path: tools/entry-point.js > escodegen.browser.min.js",
        build: "./node_modules/.bin/cjsify -a path: tools/entry-point.js > escodegen.browser.js"
      }
    };
  }
});

// node_modules/escodegen/escodegen.js
var require_escodegen = __commonJS({
  "node_modules/escodegen/escodegen.js"(exports) {
    (function() {
      "use strict";
      var Syntax, Precedence, BinaryPrecedence, SourceNode, estraverse, esutils, base, indent, json, renumber, hexadecimal, quotes, escapeless, newline, space, parentheses, semicolons, safeConcatenation, directive, extra, parse, sourceMap, sourceCode, preserveBlankLines, FORMAT_MINIFY, FORMAT_DEFAULTS;
      estraverse = require_estraverse();
      esutils = require_utils();
      Syntax = estraverse.Syntax;
      function isExpression(node) {
        return CodeGenerator.Expression.hasOwnProperty(node.type);
      }
      function isStatement(node) {
        return CodeGenerator.Statement.hasOwnProperty(node.type);
      }
      Precedence = {
        Sequence: 0,
        Yield: 1,
        Assignment: 1,
        Conditional: 2,
        ArrowFunction: 2,
        Coalesce: 3,
        LogicalOR: 4,
        LogicalAND: 5,
        BitwiseOR: 6,
        BitwiseXOR: 7,
        BitwiseAND: 8,
        Equality: 9,
        Relational: 10,
        BitwiseSHIFT: 11,
        Additive: 12,
        Multiplicative: 13,
        Exponentiation: 14,
        Await: 15,
        Unary: 15,
        Postfix: 16,
        OptionalChaining: 17,
        Call: 18,
        New: 19,
        TaggedTemplate: 20,
        Member: 21,
        Primary: 22
      };
      BinaryPrecedence = {
        "??": Precedence.Coalesce,
        "||": Precedence.LogicalOR,
        "&&": Precedence.LogicalAND,
        "|": Precedence.BitwiseOR,
        "^": Precedence.BitwiseXOR,
        "&": Precedence.BitwiseAND,
        "==": Precedence.Equality,
        "!=": Precedence.Equality,
        "===": Precedence.Equality,
        "!==": Precedence.Equality,
        "is": Precedence.Equality,
        "isnt": Precedence.Equality,
        "<": Precedence.Relational,
        ">": Precedence.Relational,
        "<=": Precedence.Relational,
        ">=": Precedence.Relational,
        "in": Precedence.Relational,
        "instanceof": Precedence.Relational,
        "<<": Precedence.BitwiseSHIFT,
        ">>": Precedence.BitwiseSHIFT,
        ">>>": Precedence.BitwiseSHIFT,
        "+": Precedence.Additive,
        "-": Precedence.Additive,
        "*": Precedence.Multiplicative,
        "%": Precedence.Multiplicative,
        "/": Precedence.Multiplicative,
        "**": Precedence.Exponentiation
      };
      var F_ALLOW_IN = 1, F_ALLOW_CALL = 1 << 1, F_ALLOW_UNPARATH_NEW = 1 << 2, F_FUNC_BODY = 1 << 3, F_DIRECTIVE_CTX = 1 << 4, F_SEMICOLON_OPT = 1 << 5, F_FOUND_COALESCE = 1 << 6;
      var E_FTT = F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW, E_TTF = F_ALLOW_IN | F_ALLOW_CALL, E_TTT = F_ALLOW_IN | F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW, E_TFF = F_ALLOW_IN, E_FFT = F_ALLOW_UNPARATH_NEW, E_TFT = F_ALLOW_IN | F_ALLOW_UNPARATH_NEW;
      var S_TFFF = F_ALLOW_IN, S_TFFT = F_ALLOW_IN | F_SEMICOLON_OPT, S_FFFF = 0, S_TFTF = F_ALLOW_IN | F_DIRECTIVE_CTX, S_TTFF = F_ALLOW_IN | F_FUNC_BODY;
      function getDefaultOptions() {
        return {
          indent: null,
          base: null,
          parse: null,
          comment: false,
          format: {
            indent: {
              style: "    ",
              base: 0,
              adjustMultilineComment: false
            },
            newline: "\n",
            space: " ",
            json: false,
            renumber: false,
            hexadecimal: false,
            quotes: "single",
            escapeless: false,
            compact: false,
            parentheses: true,
            semicolons: true,
            safeConcatenation: false,
            preserveBlankLines: false
          },
          moz: {
            comprehensionExpressionStartsWithAssignment: false,
            starlessGenerator: false
          },
          sourceMap: null,
          sourceMapRoot: null,
          sourceMapWithCode: false,
          directive: false,
          raw: true,
          verbatim: null,
          sourceCode: null
        };
      }
      function stringRepeat(str, num) {
        var result = "";
        for (num |= 0; num > 0; num >>>= 1, str += str) {
          if (num & 1) {
            result += str;
          }
        }
        return result;
      }
      function hasLineTerminator(str) {
        return /[\r\n]/g.test(str);
      }
      function endsWithLineTerminator(str) {
        var len = str.length;
        return len && esutils.code.isLineTerminator(str.charCodeAt(len - 1));
      }
      function merge(target, override) {
        var key;
        for (key in override) {
          if (override.hasOwnProperty(key)) {
            target[key] = override[key];
          }
        }
        return target;
      }
      function updateDeeply(target, override) {
        var key, val;
        function isHashObject(target2) {
          return typeof target2 === "object" && target2 instanceof Object && !(target2 instanceof RegExp);
        }
        for (key in override) {
          if (override.hasOwnProperty(key)) {
            val = override[key];
            if (isHashObject(val)) {
              if (isHashObject(target[key])) {
                updateDeeply(target[key], val);
              } else {
                target[key] = updateDeeply({}, val);
              }
            } else {
              target[key] = val;
            }
          }
        }
        return target;
      }
      function generateNumber(value) {
        var result, point, temp, exponent, pos;
        if (value !== value) {
          throw new Error("Numeric literal whose value is NaN");
        }
        if (value < 0 || value === 0 && 1 / value < 0) {
          throw new Error("Numeric literal whose value is negative");
        }
        if (value === 1 / 0) {
          return json ? "null" : renumber ? "1e400" : "1e+400";
        }
        result = "" + value;
        if (!renumber || result.length < 3) {
          return result;
        }
        point = result.indexOf(".");
        if (!json && result.charCodeAt(0) === 48 && point === 1) {
          point = 0;
          result = result.slice(1);
        }
        temp = result;
        result = result.replace("e+", "e");
        exponent = 0;
        if ((pos = temp.indexOf("e")) > 0) {
          exponent = +temp.slice(pos + 1);
          temp = temp.slice(0, pos);
        }
        if (point >= 0) {
          exponent -= temp.length - point - 1;
          temp = +(temp.slice(0, point) + temp.slice(point + 1)) + "";
        }
        pos = 0;
        while (temp.charCodeAt(temp.length + pos - 1) === 48) {
          --pos;
        }
        if (pos !== 0) {
          exponent -= pos;
          temp = temp.slice(0, pos);
        }
        if (exponent !== 0) {
          temp += "e" + exponent;
        }
        if ((temp.length < result.length || hexadecimal && value > 1e12 && Math.floor(value) === value && (temp = "0x" + value.toString(16)).length < result.length) && +temp === value) {
          result = temp;
        }
        return result;
      }
      function escapeRegExpCharacter(ch, previousIsBackslash) {
        if ((ch & ~1) === 8232) {
          return (previousIsBackslash ? "u" : "\\u") + (ch === 8232 ? "2028" : "2029");
        } else if (ch === 10 || ch === 13) {
          return (previousIsBackslash ? "" : "\\") + (ch === 10 ? "n" : "r");
        }
        return String.fromCharCode(ch);
      }
      function generateRegExp(reg) {
        var match, result, flags, i, iz, ch, characterInBrack, previousIsBackslash;
        result = reg.toString();
        if (reg.source) {
          match = result.match(/\/([^/]*)$/);
          if (!match) {
            return result;
          }
          flags = match[1];
          result = "";
          characterInBrack = false;
          previousIsBackslash = false;
          for (i = 0, iz = reg.source.length; i < iz; ++i) {
            ch = reg.source.charCodeAt(i);
            if (!previousIsBackslash) {
              if (characterInBrack) {
                if (ch === 93) {
                  characterInBrack = false;
                }
              } else {
                if (ch === 47) {
                  result += "\\";
                } else if (ch === 91) {
                  characterInBrack = true;
                }
              }
              result += escapeRegExpCharacter(ch, previousIsBackslash);
              previousIsBackslash = ch === 92;
            } else {
              result += escapeRegExpCharacter(ch, previousIsBackslash);
              previousIsBackslash = false;
            }
          }
          return "/" + result + "/" + flags;
        }
        return result;
      }
      function escapeAllowedCharacter(code, next) {
        var hex;
        if (code === 8) {
          return "\\b";
        }
        if (code === 12) {
          return "\\f";
        }
        if (code === 9) {
          return "\\t";
        }
        hex = code.toString(16).toUpperCase();
        if (json || code > 255) {
          return "\\u" + "0000".slice(hex.length) + hex;
        } else if (code === 0 && !esutils.code.isDecimalDigit(next)) {
          return "\\0";
        } else if (code === 11) {
          return "\\x0B";
        } else {
          return "\\x" + "00".slice(hex.length) + hex;
        }
      }
      function escapeDisallowedCharacter(code) {
        if (code === 92) {
          return "\\\\";
        }
        if (code === 10) {
          return "\\n";
        }
        if (code === 13) {
          return "\\r";
        }
        if (code === 8232) {
          return "\\u2028";
        }
        if (code === 8233) {
          return "\\u2029";
        }
        throw new Error("Incorrectly classified character");
      }
      function escapeDirective(str) {
        var i, iz, code, quote;
        quote = quotes === "double" ? '"' : "'";
        for (i = 0, iz = str.length; i < iz; ++i) {
          code = str.charCodeAt(i);
          if (code === 39) {
            quote = '"';
            break;
          } else if (code === 34) {
            quote = "'";
            break;
          } else if (code === 92) {
            ++i;
          }
        }
        return quote + str + quote;
      }
      function escapeString(str) {
        var result = "", i, len, code, singleQuotes = 0, doubleQuotes = 0, single, quote;
        for (i = 0, len = str.length; i < len; ++i) {
          code = str.charCodeAt(i);
          if (code === 39) {
            ++singleQuotes;
          } else if (code === 34) {
            ++doubleQuotes;
          } else if (code === 47 && json) {
            result += "\\";
          } else if (esutils.code.isLineTerminator(code) || code === 92) {
            result += escapeDisallowedCharacter(code);
            continue;
          } else if (!esutils.code.isIdentifierPartES5(code) && (json && code < 32 || !json && !escapeless && (code < 32 || code > 126))) {
            result += escapeAllowedCharacter(code, str.charCodeAt(i + 1));
            continue;
          }
          result += String.fromCharCode(code);
        }
        single = !(quotes === "double" || quotes === "auto" && doubleQuotes < singleQuotes);
        quote = single ? "'" : '"';
        if (!(single ? singleQuotes : doubleQuotes)) {
          return quote + result + quote;
        }
        str = result;
        result = quote;
        for (i = 0, len = str.length; i < len; ++i) {
          code = str.charCodeAt(i);
          if (code === 39 && single || code === 34 && !single) {
            result += "\\";
          }
          result += String.fromCharCode(code);
        }
        return result + quote;
      }
      function flattenToString(arr) {
        var i, iz, elem, result = "";
        for (i = 0, iz = arr.length; i < iz; ++i) {
          elem = arr[i];
          result += Array.isArray(elem) ? flattenToString(elem) : elem;
        }
        return result;
      }
      function toSourceNodeWhenNeeded(generated, node) {
        if (!sourceMap) {
          if (Array.isArray(generated)) {
            return flattenToString(generated);
          } else {
            return generated;
          }
        }
        if (node == null) {
          if (generated instanceof SourceNode) {
            return generated;
          } else {
            node = {};
          }
        }
        if (node.loc == null) {
          return new SourceNode(null, null, sourceMap, generated, node.name || null);
        }
        return new SourceNode(node.loc.start.line, node.loc.start.column, sourceMap === true ? node.loc.source || null : sourceMap, generated, node.name || null);
      }
      function noEmptySpace() {
        return space ? space : " ";
      }
      function join(left, right) {
        var leftSource, rightSource, leftCharCode, rightCharCode;
        leftSource = toSourceNodeWhenNeeded(left).toString();
        if (leftSource.length === 0) {
          return [right];
        }
        rightSource = toSourceNodeWhenNeeded(right).toString();
        if (rightSource.length === 0) {
          return [left];
        }
        leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
        rightCharCode = rightSource.charCodeAt(0);
        if ((leftCharCode === 43 || leftCharCode === 45) && leftCharCode === rightCharCode || esutils.code.isIdentifierPartES5(leftCharCode) && esutils.code.isIdentifierPartES5(rightCharCode) || leftCharCode === 47 && rightCharCode === 105) {
          return [left, noEmptySpace(), right];
        } else if (esutils.code.isWhiteSpace(leftCharCode) || esutils.code.isLineTerminator(leftCharCode) || esutils.code.isWhiteSpace(rightCharCode) || esutils.code.isLineTerminator(rightCharCode)) {
          return [left, right];
        }
        return [left, space, right];
      }
      function addIndent(stmt) {
        return [base, stmt];
      }
      function withIndent(fn) {
        var previousBase;
        previousBase = base;
        base += indent;
        fn(base);
        base = previousBase;
      }
      function calculateSpaces(str) {
        var i;
        for (i = str.length - 1; i >= 0; --i) {
          if (esutils.code.isLineTerminator(str.charCodeAt(i))) {
            break;
          }
        }
        return str.length - 1 - i;
      }
      function adjustMultilineComment(value, specialBase) {
        var array, i, len, line, j, spaces, previousBase, sn;
        array = value.split(/\r\n|[\r\n]/);
        spaces = Number.MAX_VALUE;
        for (i = 1, len = array.length; i < len; ++i) {
          line = array[i];
          j = 0;
          while (j < line.length && esutils.code.isWhiteSpace(line.charCodeAt(j))) {
            ++j;
          }
          if (spaces > j) {
            spaces = j;
          }
        }
        if (typeof specialBase !== "undefined") {
          previousBase = base;
          if (array[1][spaces] === "*") {
            specialBase += " ";
          }
          base = specialBase;
        } else {
          if (spaces & 1) {
            --spaces;
          }
          previousBase = base;
        }
        for (i = 1, len = array.length; i < len; ++i) {
          sn = toSourceNodeWhenNeeded(addIndent(array[i].slice(spaces)));
          array[i] = sourceMap ? sn.join("") : sn;
        }
        base = previousBase;
        return array.join("\n");
      }
      function generateComment(comment, specialBase) {
        if (comment.type === "Line") {
          if (endsWithLineTerminator(comment.value)) {
            return "//" + comment.value;
          } else {
            var result = "//" + comment.value;
            if (!preserveBlankLines) {
              result += "\n";
            }
            return result;
          }
        }
        if (extra.format.indent.adjustMultilineComment && /[\n\r]/.test(comment.value)) {
          return adjustMultilineComment("/*" + comment.value + "*/", specialBase);
        }
        return "/*" + comment.value + "*/";
      }
      function addComments(stmt, result) {
        var i, len, comment, save, tailingToStatement, specialBase, fragment, extRange, range, prevRange, prefix, infix, suffix, count;
        if (stmt.leadingComments && stmt.leadingComments.length > 0) {
          save = result;
          if (preserveBlankLines) {
            comment = stmt.leadingComments[0];
            result = [];
            extRange = comment.extendedRange;
            range = comment.range;
            prefix = sourceCode.substring(extRange[0], range[0]);
            count = (prefix.match(/\n/g) || []).length;
            if (count > 0) {
              result.push(stringRepeat("\n", count));
              result.push(addIndent(generateComment(comment)));
            } else {
              result.push(prefix);
              result.push(generateComment(comment));
            }
            prevRange = range;
            for (i = 1, len = stmt.leadingComments.length; i < len; i++) {
              comment = stmt.leadingComments[i];
              range = comment.range;
              infix = sourceCode.substring(prevRange[1], range[0]);
              count = (infix.match(/\n/g) || []).length;
              result.push(stringRepeat("\n", count));
              result.push(addIndent(generateComment(comment)));
              prevRange = range;
            }
            suffix = sourceCode.substring(range[1], extRange[1]);
            count = (suffix.match(/\n/g) || []).length;
            result.push(stringRepeat("\n", count));
          } else {
            comment = stmt.leadingComments[0];
            result = [];
            if (safeConcatenation && stmt.type === Syntax.Program && stmt.body.length === 0) {
              result.push("\n");
            }
            result.push(generateComment(comment));
            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
              result.push("\n");
            }
            for (i = 1, len = stmt.leadingComments.length; i < len; ++i) {
              comment = stmt.leadingComments[i];
              fragment = [generateComment(comment)];
              if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                fragment.push("\n");
              }
              result.push(addIndent(fragment));
            }
          }
          result.push(addIndent(save));
        }
        if (stmt.trailingComments) {
          if (preserveBlankLines) {
            comment = stmt.trailingComments[0];
            extRange = comment.extendedRange;
            range = comment.range;
            prefix = sourceCode.substring(extRange[0], range[0]);
            count = (prefix.match(/\n/g) || []).length;
            if (count > 0) {
              result.push(stringRepeat("\n", count));
              result.push(addIndent(generateComment(comment)));
            } else {
              result.push(prefix);
              result.push(generateComment(comment));
            }
          } else {
            tailingToStatement = !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
            specialBase = stringRepeat(" ", calculateSpaces(toSourceNodeWhenNeeded([base, result, indent]).toString()));
            for (i = 0, len = stmt.trailingComments.length; i < len; ++i) {
              comment = stmt.trailingComments[i];
              if (tailingToStatement) {
                if (i === 0) {
                  result = [result, indent];
                } else {
                  result = [result, specialBase];
                }
                result.push(generateComment(comment, specialBase));
              } else {
                result = [result, addIndent(generateComment(comment))];
              }
              if (i !== len - 1 && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result = [result, "\n"];
              }
            }
          }
        }
        return result;
      }
      function generateBlankLines(start, end, result) {
        var j, newlineCount = 0;
        for (j = start; j < end; j++) {
          if (sourceCode[j] === "\n") {
            newlineCount++;
          }
        }
        for (j = 1; j < newlineCount; j++) {
          result.push(newline);
        }
      }
      function parenthesize(text, current, should) {
        if (current < should) {
          return ["(", text, ")"];
        }
        return text;
      }
      function generateVerbatimString(string) {
        var i, iz, result;
        result = string.split(/\r\n|\n/);
        for (i = 1, iz = result.length; i < iz; i++) {
          result[i] = newline + base + result[i];
        }
        return result;
      }
      function generateVerbatim(expr, precedence) {
        var verbatim, result, prec;
        verbatim = expr[extra.verbatim];
        if (typeof verbatim === "string") {
          result = parenthesize(generateVerbatimString(verbatim), Precedence.Sequence, precedence);
        } else {
          result = generateVerbatimString(verbatim.content);
          prec = verbatim.precedence != null ? verbatim.precedence : Precedence.Sequence;
          result = parenthesize(result, prec, precedence);
        }
        return toSourceNodeWhenNeeded(result, expr);
      }
      function CodeGenerator() {
      }
      CodeGenerator.prototype.maybeBlock = function(stmt, flags) {
        var result, noLeadingComment, that = this;
        noLeadingComment = !extra.comment || !stmt.leadingComments;
        if (stmt.type === Syntax.BlockStatement && noLeadingComment) {
          return [space, this.generateStatement(stmt, flags)];
        }
        if (stmt.type === Syntax.EmptyStatement && noLeadingComment) {
          return ";";
        }
        withIndent(function() {
          result = [
            newline,
            addIndent(that.generateStatement(stmt, flags))
          ];
        });
        return result;
      };
      CodeGenerator.prototype.maybeBlockSuffix = function(stmt, result) {
        var ends = endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
        if (stmt.type === Syntax.BlockStatement && (!extra.comment || !stmt.leadingComments) && !ends) {
          return [result, space];
        }
        if (ends) {
          return [result, base];
        }
        return [result, newline, base];
      };
      function generateIdentifier(node) {
        return toSourceNodeWhenNeeded(node.name, node);
      }
      function generateAsyncPrefix(node, spaceRequired) {
        return node.async ? "async" + (spaceRequired ? noEmptySpace() : space) : "";
      }
      function generateStarSuffix(node) {
        var isGenerator = node.generator && !extra.moz.starlessGenerator;
        return isGenerator ? "*" + space : "";
      }
      function generateMethodPrefix(prop) {
        var func = prop.value, prefix = "";
        if (func.async) {
          prefix += generateAsyncPrefix(func, !prop.computed);
        }
        if (func.generator) {
          prefix += generateStarSuffix(func) ? "*" : "";
        }
        return prefix;
      }
      CodeGenerator.prototype.generatePattern = function(node, precedence, flags) {
        if (node.type === Syntax.Identifier) {
          return generateIdentifier(node);
        }
        return this.generateExpression(node, precedence, flags);
      };
      CodeGenerator.prototype.generateFunctionParams = function(node) {
        var i, iz, result, hasDefault;
        hasDefault = false;
        if (node.type === Syntax.ArrowFunctionExpression && !node.rest && (!node.defaults || node.defaults.length === 0) && node.params.length === 1 && node.params[0].type === Syntax.Identifier) {
          result = [generateAsyncPrefix(node, true), generateIdentifier(node.params[0])];
        } else {
          result = node.type === Syntax.ArrowFunctionExpression ? [generateAsyncPrefix(node, false)] : [];
          result.push("(");
          if (node.defaults) {
            hasDefault = true;
          }
          for (i = 0, iz = node.params.length; i < iz; ++i) {
            if (hasDefault && node.defaults[i]) {
              result.push(this.generateAssignment(node.params[i], node.defaults[i], "=", Precedence.Assignment, E_TTT));
            } else {
              result.push(this.generatePattern(node.params[i], Precedence.Assignment, E_TTT));
            }
            if (i + 1 < iz) {
              result.push("," + space);
            }
          }
          if (node.rest) {
            if (node.params.length) {
              result.push("," + space);
            }
            result.push("...");
            result.push(generateIdentifier(node.rest));
          }
          result.push(")");
        }
        return result;
      };
      CodeGenerator.prototype.generateFunctionBody = function(node) {
        var result, expr;
        result = this.generateFunctionParams(node);
        if (node.type === Syntax.ArrowFunctionExpression) {
          result.push(space);
          result.push("=>");
        }
        if (node.expression) {
          result.push(space);
          expr = this.generateExpression(node.body, Precedence.Assignment, E_TTT);
          if (expr.toString().charAt(0) === "{") {
            expr = ["(", expr, ")"];
          }
          result.push(expr);
        } else {
          result.push(this.maybeBlock(node.body, S_TTFF));
        }
        return result;
      };
      CodeGenerator.prototype.generateIterationForStatement = function(operator, stmt, flags) {
        var result = ["for" + (stmt.await ? noEmptySpace() + "await" : "") + space + "("], that = this;
        withIndent(function() {
          if (stmt.left.type === Syntax.VariableDeclaration) {
            withIndent(function() {
              result.push(stmt.left.kind + noEmptySpace());
              result.push(that.generateStatement(stmt.left.declarations[0], S_FFFF));
            });
          } else {
            result.push(that.generateExpression(stmt.left, Precedence.Call, E_TTT));
          }
          result = join(result, operator);
          result = [join(
            result,
            that.generateExpression(stmt.right, Precedence.Assignment, E_TTT)
          ), ")"];
        });
        result.push(this.maybeBlock(stmt.body, flags));
        return result;
      };
      CodeGenerator.prototype.generatePropertyKey = function(expr, computed) {
        var result = [];
        if (computed) {
          result.push("[");
        }
        result.push(this.generateExpression(expr, Precedence.Assignment, E_TTT));
        if (computed) {
          result.push("]");
        }
        return result;
      };
      CodeGenerator.prototype.generateAssignment = function(left, right, operator, precedence, flags) {
        if (Precedence.Assignment < precedence) {
          flags |= F_ALLOW_IN;
        }
        return parenthesize(
          [
            this.generateExpression(left, Precedence.Call, flags),
            space + operator + space,
            this.generateExpression(right, Precedence.Assignment, flags)
          ],
          Precedence.Assignment,
          precedence
        );
      };
      CodeGenerator.prototype.semicolon = function(flags) {
        if (!semicolons && flags & F_SEMICOLON_OPT) {
          return "";
        }
        return ";";
      };
      CodeGenerator.Statement = {
        BlockStatement: function(stmt, flags) {
          var range, content, result = ["{", newline], that = this;
          withIndent(function() {
            if (stmt.body.length === 0 && preserveBlankLines) {
              range = stmt.range;
              if (range[1] - range[0] > 2) {
                content = sourceCode.substring(range[0] + 1, range[1] - 1);
                if (content[0] === "\n") {
                  result = ["{"];
                }
                result.push(content);
              }
            }
            var i, iz, fragment, bodyFlags;
            bodyFlags = S_TFFF;
            if (flags & F_FUNC_BODY) {
              bodyFlags |= F_DIRECTIVE_CTX;
            }
            for (i = 0, iz = stmt.body.length; i < iz; ++i) {
              if (preserveBlankLines) {
                if (i === 0) {
                  if (stmt.body[0].leadingComments) {
                    range = stmt.body[0].leadingComments[0].extendedRange;
                    content = sourceCode.substring(range[0], range[1]);
                    if (content[0] === "\n") {
                      result = ["{"];
                    }
                  }
                  if (!stmt.body[0].leadingComments) {
                    generateBlankLines(stmt.range[0], stmt.body[0].range[0], result);
                  }
                }
                if (i > 0) {
                  if (!stmt.body[i - 1].trailingComments && !stmt.body[i].leadingComments) {
                    generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result);
                  }
                }
              }
              if (i === iz - 1) {
                bodyFlags |= F_SEMICOLON_OPT;
              }
              if (stmt.body[i].leadingComments && preserveBlankLines) {
                fragment = that.generateStatement(stmt.body[i], bodyFlags);
              } else {
                fragment = addIndent(that.generateStatement(stmt.body[i], bodyFlags));
              }
              result.push(fragment);
              if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                if (preserveBlankLines && i < iz - 1) {
                  if (!stmt.body[i + 1].leadingComments) {
                    result.push(newline);
                  }
                } else {
                  result.push(newline);
                }
              }
              if (preserveBlankLines) {
                if (i === iz - 1) {
                  if (!stmt.body[i].trailingComments) {
                    generateBlankLines(stmt.body[i].range[1], stmt.range[1], result);
                  }
                }
              }
            }
          });
          result.push(addIndent("}"));
          return result;
        },
        BreakStatement: function(stmt, flags) {
          if (stmt.label) {
            return "break " + stmt.label.name + this.semicolon(flags);
          }
          return "break" + this.semicolon(flags);
        },
        ContinueStatement: function(stmt, flags) {
          if (stmt.label) {
            return "continue " + stmt.label.name + this.semicolon(flags);
          }
          return "continue" + this.semicolon(flags);
        },
        ClassBody: function(stmt, flags) {
          var result = ["{", newline], that = this;
          withIndent(function(indent2) {
            var i, iz;
            for (i = 0, iz = stmt.body.length; i < iz; ++i) {
              result.push(indent2);
              result.push(that.generateExpression(stmt.body[i], Precedence.Sequence, E_TTT));
              if (i + 1 < iz) {
                result.push(newline);
              }
            }
          });
          if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
            result.push(newline);
          }
          result.push(base);
          result.push("}");
          return result;
        },
        ClassDeclaration: function(stmt, flags) {
          var result, fragment;
          result = ["class"];
          if (stmt.id) {
            result = join(result, this.generateExpression(stmt.id, Precedence.Sequence, E_TTT));
          }
          if (stmt.superClass) {
            fragment = join("extends", this.generateExpression(stmt.superClass, Precedence.Unary, E_TTT));
            result = join(result, fragment);
          }
          result.push(space);
          result.push(this.generateStatement(stmt.body, S_TFFT));
          return result;
        },
        DirectiveStatement: function(stmt, flags) {
          if (extra.raw && stmt.raw) {
            return stmt.raw + this.semicolon(flags);
          }
          return escapeDirective(stmt.directive) + this.semicolon(flags);
        },
        DoWhileStatement: function(stmt, flags) {
          var result = join("do", this.maybeBlock(stmt.body, S_TFFF));
          result = this.maybeBlockSuffix(stmt.body, result);
          return join(result, [
            "while" + space + "(",
            this.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
            ")" + this.semicolon(flags)
          ]);
        },
        CatchClause: function(stmt, flags) {
          var result, that = this;
          withIndent(function() {
            var guard;
            if (stmt.param) {
              result = [
                "catch" + space + "(",
                that.generateExpression(stmt.param, Precedence.Sequence, E_TTT),
                ")"
              ];
              if (stmt.guard) {
                guard = that.generateExpression(stmt.guard, Precedence.Sequence, E_TTT);
                result.splice(2, 0, " if ", guard);
              }
            } else {
              result = ["catch"];
            }
          });
          result.push(this.maybeBlock(stmt.body, S_TFFF));
          return result;
        },
        DebuggerStatement: function(stmt, flags) {
          return "debugger" + this.semicolon(flags);
        },
        EmptyStatement: function(stmt, flags) {
          return ";";
        },
        ExportDefaultDeclaration: function(stmt, flags) {
          var result = ["export"], bodyFlags;
          bodyFlags = flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF;
          result = join(result, "default");
          if (isStatement(stmt.declaration)) {
            result = join(result, this.generateStatement(stmt.declaration, bodyFlags));
          } else {
            result = join(result, this.generateExpression(stmt.declaration, Precedence.Assignment, E_TTT) + this.semicolon(flags));
          }
          return result;
        },
        ExportNamedDeclaration: function(stmt, flags) {
          var result = ["export"], bodyFlags, that = this;
          bodyFlags = flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF;
          if (stmt.declaration) {
            return join(result, this.generateStatement(stmt.declaration, bodyFlags));
          }
          if (stmt.specifiers) {
            if (stmt.specifiers.length === 0) {
              result = join(result, "{" + space + "}");
            } else if (stmt.specifiers[0].type === Syntax.ExportBatchSpecifier) {
              result = join(result, this.generateExpression(stmt.specifiers[0], Precedence.Sequence, E_TTT));
            } else {
              result = join(result, "{");
              withIndent(function(indent2) {
                var i, iz;
                result.push(newline);
                for (i = 0, iz = stmt.specifiers.length; i < iz; ++i) {
                  result.push(indent2);
                  result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                  if (i + 1 < iz) {
                    result.push("," + newline);
                  }
                }
              });
              if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
              }
              result.push(base + "}");
            }
            if (stmt.source) {
              result = join(result, [
                "from" + space,
                // ModuleSpecifier
                this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                this.semicolon(flags)
              ]);
            } else {
              result.push(this.semicolon(flags));
            }
          }
          return result;
        },
        ExportAllDeclaration: function(stmt, flags) {
          return [
            "export" + space,
            "*" + space,
            "from" + space,
            // ModuleSpecifier
            this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
            this.semicolon(flags)
          ];
        },
        ExpressionStatement: function(stmt, flags) {
          var result, fragment;
          function isClassPrefixed(fragment2) {
            var code;
            if (fragment2.slice(0, 5) !== "class") {
              return false;
            }
            code = fragment2.charCodeAt(5);
            return code === 123 || esutils.code.isWhiteSpace(code) || esutils.code.isLineTerminator(code);
          }
          function isFunctionPrefixed(fragment2) {
            var code;
            if (fragment2.slice(0, 8) !== "function") {
              return false;
            }
            code = fragment2.charCodeAt(8);
            return code === 40 || esutils.code.isWhiteSpace(code) || code === 42 || esutils.code.isLineTerminator(code);
          }
          function isAsyncPrefixed(fragment2) {
            var code, i, iz;
            if (fragment2.slice(0, 5) !== "async") {
              return false;
            }
            if (!esutils.code.isWhiteSpace(fragment2.charCodeAt(5))) {
              return false;
            }
            for (i = 6, iz = fragment2.length; i < iz; ++i) {
              if (!esutils.code.isWhiteSpace(fragment2.charCodeAt(i))) {
                break;
              }
            }
            if (i === iz) {
              return false;
            }
            if (fragment2.slice(i, i + 8) !== "function") {
              return false;
            }
            code = fragment2.charCodeAt(i + 8);
            return code === 40 || esutils.code.isWhiteSpace(code) || code === 42 || esutils.code.isLineTerminator(code);
          }
          result = [this.generateExpression(stmt.expression, Precedence.Sequence, E_TTT)];
          fragment = toSourceNodeWhenNeeded(result).toString();
          if (fragment.charCodeAt(0) === 123 || // ObjectExpression
          isClassPrefixed(fragment) || isFunctionPrefixed(fragment) || isAsyncPrefixed(fragment) || directive && flags & F_DIRECTIVE_CTX && stmt.expression.type === Syntax.Literal && typeof stmt.expression.value === "string") {
            result = ["(", result, ")" + this.semicolon(flags)];
          } else {
            result.push(this.semicolon(flags));
          }
          return result;
        },
        ImportDeclaration: function(stmt, flags) {
          var result, cursor, that = this;
          if (stmt.specifiers.length === 0) {
            return [
              "import",
              space,
              // ModuleSpecifier
              this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
              this.semicolon(flags)
            ];
          }
          result = [
            "import"
          ];
          cursor = 0;
          if (stmt.specifiers[cursor].type === Syntax.ImportDefaultSpecifier) {
            result = join(result, [
              this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
            ]);
            ++cursor;
          }
          if (stmt.specifiers[cursor]) {
            if (cursor !== 0) {
              result.push(",");
            }
            if (stmt.specifiers[cursor].type === Syntax.ImportNamespaceSpecifier) {
              result = join(result, [
                space,
                this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
              ]);
            } else {
              result.push(space + "{");
              if (stmt.specifiers.length - cursor === 1) {
                result.push(space);
                result.push(this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT));
                result.push(space + "}" + space);
              } else {
                withIndent(function(indent2) {
                  var i, iz;
                  result.push(newline);
                  for (i = cursor, iz = stmt.specifiers.length; i < iz; ++i) {
                    result.push(indent2);
                    result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                    if (i + 1 < iz) {
                      result.push("," + newline);
                    }
                  }
                });
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                  result.push(newline);
                }
                result.push(base + "}" + space);
              }
            }
          }
          result = join(result, [
            "from" + space,
            // ModuleSpecifier
            this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
            this.semicolon(flags)
          ]);
          return result;
        },
        VariableDeclarator: function(stmt, flags) {
          var itemFlags = flags & F_ALLOW_IN ? E_TTT : E_FTT;
          if (stmt.init) {
            return [
              this.generateExpression(stmt.id, Precedence.Assignment, itemFlags),
              space,
              "=",
              space,
              this.generateExpression(stmt.init, Precedence.Assignment, itemFlags)
            ];
          }
          return this.generatePattern(stmt.id, Precedence.Assignment, itemFlags);
        },
        VariableDeclaration: function(stmt, flags) {
          var result, i, iz, node, bodyFlags, that = this;
          result = [stmt.kind];
          bodyFlags = flags & F_ALLOW_IN ? S_TFFF : S_FFFF;
          function block() {
            node = stmt.declarations[0];
            if (extra.comment && node.leadingComments) {
              result.push("\n");
              result.push(addIndent(that.generateStatement(node, bodyFlags)));
            } else {
              result.push(noEmptySpace());
              result.push(that.generateStatement(node, bodyFlags));
            }
            for (i = 1, iz = stmt.declarations.length; i < iz; ++i) {
              node = stmt.declarations[i];
              if (extra.comment && node.leadingComments) {
                result.push("," + newline);
                result.push(addIndent(that.generateStatement(node, bodyFlags)));
              } else {
                result.push("," + space);
                result.push(that.generateStatement(node, bodyFlags));
              }
            }
          }
          if (stmt.declarations.length > 1) {
            withIndent(block);
          } else {
            block();
          }
          result.push(this.semicolon(flags));
          return result;
        },
        ThrowStatement: function(stmt, flags) {
          return [join(
            "throw",
            this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)
          ), this.semicolon(flags)];
        },
        TryStatement: function(stmt, flags) {
          var result, i, iz, guardedHandlers;
          result = ["try", this.maybeBlock(stmt.block, S_TFFF)];
          result = this.maybeBlockSuffix(stmt.block, result);
          if (stmt.handlers) {
            for (i = 0, iz = stmt.handlers.length; i < iz; ++i) {
              result = join(result, this.generateStatement(stmt.handlers[i], S_TFFF));
              if (stmt.finalizer || i + 1 !== iz) {
                result = this.maybeBlockSuffix(stmt.handlers[i].body, result);
              }
            }
          } else {
            guardedHandlers = stmt.guardedHandlers || [];
            for (i = 0, iz = guardedHandlers.length; i < iz; ++i) {
              result = join(result, this.generateStatement(guardedHandlers[i], S_TFFF));
              if (stmt.finalizer || i + 1 !== iz) {
                result = this.maybeBlockSuffix(guardedHandlers[i].body, result);
              }
            }
            if (stmt.handler) {
              if (Array.isArray(stmt.handler)) {
                for (i = 0, iz = stmt.handler.length; i < iz; ++i) {
                  result = join(result, this.generateStatement(stmt.handler[i], S_TFFF));
                  if (stmt.finalizer || i + 1 !== iz) {
                    result = this.maybeBlockSuffix(stmt.handler[i].body, result);
                  }
                }
              } else {
                result = join(result, this.generateStatement(stmt.handler, S_TFFF));
                if (stmt.finalizer) {
                  result = this.maybeBlockSuffix(stmt.handler.body, result);
                }
              }
            }
          }
          if (stmt.finalizer) {
            result = join(result, ["finally", this.maybeBlock(stmt.finalizer, S_TFFF)]);
          }
          return result;
        },
        SwitchStatement: function(stmt, flags) {
          var result, fragment, i, iz, bodyFlags, that = this;
          withIndent(function() {
            result = [
              "switch" + space + "(",
              that.generateExpression(stmt.discriminant, Precedence.Sequence, E_TTT),
              ")" + space + "{" + newline
            ];
          });
          if (stmt.cases) {
            bodyFlags = S_TFFF;
            for (i = 0, iz = stmt.cases.length; i < iz; ++i) {
              if (i === iz - 1) {
                bodyFlags |= F_SEMICOLON_OPT;
              }
              fragment = addIndent(this.generateStatement(stmt.cases[i], bodyFlags));
              result.push(fragment);
              if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                result.push(newline);
              }
            }
          }
          result.push(addIndent("}"));
          return result;
        },
        SwitchCase: function(stmt, flags) {
          var result, fragment, i, iz, bodyFlags, that = this;
          withIndent(function() {
            if (stmt.test) {
              result = [
                join("case", that.generateExpression(stmt.test, Precedence.Sequence, E_TTT)),
                ":"
              ];
            } else {
              result = ["default:"];
            }
            i = 0;
            iz = stmt.consequent.length;
            if (iz && stmt.consequent[0].type === Syntax.BlockStatement) {
              fragment = that.maybeBlock(stmt.consequent[0], S_TFFF);
              result.push(fragment);
              i = 1;
            }
            if (i !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
              result.push(newline);
            }
            bodyFlags = S_TFFF;
            for (; i < iz; ++i) {
              if (i === iz - 1 && flags & F_SEMICOLON_OPT) {
                bodyFlags |= F_SEMICOLON_OPT;
              }
              fragment = addIndent(that.generateStatement(stmt.consequent[i], bodyFlags));
              result.push(fragment);
              if (i + 1 !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                result.push(newline);
              }
            }
          });
          return result;
        },
        IfStatement: function(stmt, flags) {
          var result, bodyFlags, semicolonOptional, that = this;
          withIndent(function() {
            result = [
              "if" + space + "(",
              that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
              ")"
            ];
          });
          semicolonOptional = flags & F_SEMICOLON_OPT;
          bodyFlags = S_TFFF;
          if (semicolonOptional) {
            bodyFlags |= F_SEMICOLON_OPT;
          }
          if (stmt.alternate) {
            result.push(this.maybeBlock(stmt.consequent, S_TFFF));
            result = this.maybeBlockSuffix(stmt.consequent, result);
            if (stmt.alternate.type === Syntax.IfStatement) {
              result = join(result, ["else ", this.generateStatement(stmt.alternate, bodyFlags)]);
            } else {
              result = join(result, join("else", this.maybeBlock(stmt.alternate, bodyFlags)));
            }
          } else {
            result.push(this.maybeBlock(stmt.consequent, bodyFlags));
          }
          return result;
        },
        ForStatement: function(stmt, flags) {
          var result, that = this;
          withIndent(function() {
            result = ["for" + space + "("];
            if (stmt.init) {
              if (stmt.init.type === Syntax.VariableDeclaration) {
                result.push(that.generateStatement(stmt.init, S_FFFF));
              } else {
                result.push(that.generateExpression(stmt.init, Precedence.Sequence, E_FTT));
                result.push(";");
              }
            } else {
              result.push(";");
            }
            if (stmt.test) {
              result.push(space);
              result.push(that.generateExpression(stmt.test, Precedence.Sequence, E_TTT));
              result.push(";");
            } else {
              result.push(";");
            }
            if (stmt.update) {
              result.push(space);
              result.push(that.generateExpression(stmt.update, Precedence.Sequence, E_TTT));
              result.push(")");
            } else {
              result.push(")");
            }
          });
          result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
          return result;
        },
        ForInStatement: function(stmt, flags) {
          return this.generateIterationForStatement("in", stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
        },
        ForOfStatement: function(stmt, flags) {
          return this.generateIterationForStatement("of", stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
        },
        LabeledStatement: function(stmt, flags) {
          return [stmt.label.name + ":", this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)];
        },
        Program: function(stmt, flags) {
          var result, fragment, i, iz, bodyFlags;
          iz = stmt.body.length;
          result = [safeConcatenation && iz > 0 ? "\n" : ""];
          bodyFlags = S_TFTF;
          for (i = 0; i < iz; ++i) {
            if (!safeConcatenation && i === iz - 1) {
              bodyFlags |= F_SEMICOLON_OPT;
            }
            if (preserveBlankLines) {
              if (i === 0) {
                if (!stmt.body[0].leadingComments) {
                  generateBlankLines(stmt.range[0], stmt.body[i].range[0], result);
                }
              }
              if (i > 0) {
                if (!stmt.body[i - 1].trailingComments && !stmt.body[i].leadingComments) {
                  generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result);
                }
              }
            }
            fragment = addIndent(this.generateStatement(stmt.body[i], bodyFlags));
            result.push(fragment);
            if (i + 1 < iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
              if (preserveBlankLines) {
                if (!stmt.body[i + 1].leadingComments) {
                  result.push(newline);
                }
              } else {
                result.push(newline);
              }
            }
            if (preserveBlankLines) {
              if (i === iz - 1) {
                if (!stmt.body[i].trailingComments) {
                  generateBlankLines(stmt.body[i].range[1], stmt.range[1], result);
                }
              }
            }
          }
          return result;
        },
        FunctionDeclaration: function(stmt, flags) {
          return [
            generateAsyncPrefix(stmt, true),
            "function",
            generateStarSuffix(stmt) || noEmptySpace(),
            stmt.id ? generateIdentifier(stmt.id) : "",
            this.generateFunctionBody(stmt)
          ];
        },
        ReturnStatement: function(stmt, flags) {
          if (stmt.argument) {
            return [join(
              "return",
              this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)
            ), this.semicolon(flags)];
          }
          return ["return" + this.semicolon(flags)];
        },
        WhileStatement: function(stmt, flags) {
          var result, that = this;
          withIndent(function() {
            result = [
              "while" + space + "(",
              that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
              ")"
            ];
          });
          result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
          return result;
        },
        WithStatement: function(stmt, flags) {
          var result, that = this;
          withIndent(function() {
            result = [
              "with" + space + "(",
              that.generateExpression(stmt.object, Precedence.Sequence, E_TTT),
              ")"
            ];
          });
          result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
          return result;
        }
      };
      merge(CodeGenerator.prototype, CodeGenerator.Statement);
      CodeGenerator.Expression = {
        SequenceExpression: function(expr, precedence, flags) {
          var result, i, iz;
          if (Precedence.Sequence < precedence) {
            flags |= F_ALLOW_IN;
          }
          result = [];
          for (i = 0, iz = expr.expressions.length; i < iz; ++i) {
            result.push(this.generateExpression(expr.expressions[i], Precedence.Assignment, flags));
            if (i + 1 < iz) {
              result.push("," + space);
            }
          }
          return parenthesize(result, Precedence.Sequence, precedence);
        },
        AssignmentExpression: function(expr, precedence, flags) {
          return this.generateAssignment(expr.left, expr.right, expr.operator, precedence, flags);
        },
        ArrowFunctionExpression: function(expr, precedence, flags) {
          return parenthesize(this.generateFunctionBody(expr), Precedence.ArrowFunction, precedence);
        },
        ConditionalExpression: function(expr, precedence, flags) {
          if (Precedence.Conditional < precedence) {
            flags |= F_ALLOW_IN;
          }
          return parenthesize(
            [
              this.generateExpression(expr.test, Precedence.Coalesce, flags),
              space + "?" + space,
              this.generateExpression(expr.consequent, Precedence.Assignment, flags),
              space + ":" + space,
              this.generateExpression(expr.alternate, Precedence.Assignment, flags)
            ],
            Precedence.Conditional,
            precedence
          );
        },
        LogicalExpression: function(expr, precedence, flags) {
          if (expr.operator === "??") {
            flags |= F_FOUND_COALESCE;
          }
          return this.BinaryExpression(expr, precedence, flags);
        },
        BinaryExpression: function(expr, precedence, flags) {
          var result, leftPrecedence, rightPrecedence, currentPrecedence, fragment, leftSource;
          currentPrecedence = BinaryPrecedence[expr.operator];
          leftPrecedence = expr.operator === "**" ? Precedence.Postfix : currentPrecedence;
          rightPrecedence = expr.operator === "**" ? currentPrecedence : currentPrecedence + 1;
          if (currentPrecedence < precedence) {
            flags |= F_ALLOW_IN;
          }
          fragment = this.generateExpression(expr.left, leftPrecedence, flags);
          leftSource = fragment.toString();
          if (leftSource.charCodeAt(leftSource.length - 1) === 47 && esutils.code.isIdentifierPartES5(expr.operator.charCodeAt(0))) {
            result = [fragment, noEmptySpace(), expr.operator];
          } else {
            result = join(fragment, expr.operator);
          }
          fragment = this.generateExpression(expr.right, rightPrecedence, flags);
          if (expr.operator === "/" && fragment.toString().charAt(0) === "/" || expr.operator.slice(-1) === "<" && fragment.toString().slice(0, 3) === "!--") {
            result.push(noEmptySpace());
            result.push(fragment);
          } else {
            result = join(result, fragment);
          }
          if (expr.operator === "in" && !(flags & F_ALLOW_IN)) {
            return ["(", result, ")"];
          }
          if ((expr.operator === "||" || expr.operator === "&&") && flags & F_FOUND_COALESCE) {
            return ["(", result, ")"];
          }
          return parenthesize(result, currentPrecedence, precedence);
        },
        CallExpression: function(expr, precedence, flags) {
          var result, i, iz;
          result = [this.generateExpression(expr.callee, Precedence.Call, E_TTF)];
          if (expr.optional) {
            result.push("?.");
          }
          result.push("(");
          for (i = 0, iz = expr["arguments"].length; i < iz; ++i) {
            result.push(this.generateExpression(expr["arguments"][i], Precedence.Assignment, E_TTT));
            if (i + 1 < iz) {
              result.push("," + space);
            }
          }
          result.push(")");
          if (!(flags & F_ALLOW_CALL)) {
            return ["(", result, ")"];
          }
          return parenthesize(result, Precedence.Call, precedence);
        },
        ChainExpression: function(expr, precedence, flags) {
          if (Precedence.OptionalChaining < precedence) {
            flags |= F_ALLOW_CALL;
          }
          var result = this.generateExpression(expr.expression, Precedence.OptionalChaining, flags);
          return parenthesize(result, Precedence.OptionalChaining, precedence);
        },
        NewExpression: function(expr, precedence, flags) {
          var result, length, i, iz, itemFlags;
          length = expr["arguments"].length;
          itemFlags = flags & F_ALLOW_UNPARATH_NEW && !parentheses && length === 0 ? E_TFT : E_TFF;
          result = join(
            "new",
            this.generateExpression(expr.callee, Precedence.New, itemFlags)
          );
          if (!(flags & F_ALLOW_UNPARATH_NEW) || parentheses || length > 0) {
            result.push("(");
            for (i = 0, iz = length; i < iz; ++i) {
              result.push(this.generateExpression(expr["arguments"][i], Precedence.Assignment, E_TTT));
              if (i + 1 < iz) {
                result.push("," + space);
              }
            }
            result.push(")");
          }
          return parenthesize(result, Precedence.New, precedence);
        },
        MemberExpression: function(expr, precedence, flags) {
          var result, fragment;
          result = [this.generateExpression(expr.object, Precedence.Call, flags & F_ALLOW_CALL ? E_TTF : E_TFF)];
          if (expr.computed) {
            if (expr.optional) {
              result.push("?.");
            }
            result.push("[");
            result.push(this.generateExpression(expr.property, Precedence.Sequence, flags & F_ALLOW_CALL ? E_TTT : E_TFT));
            result.push("]");
          } else {
            if (!expr.optional && expr.object.type === Syntax.Literal && typeof expr.object.value === "number") {
              fragment = toSourceNodeWhenNeeded(result).toString();
              if (fragment.indexOf(".") < 0 && !/[eExX]/.test(fragment) && esutils.code.isDecimalDigit(fragment.charCodeAt(fragment.length - 1)) && !(fragment.length >= 2 && fragment.charCodeAt(0) === 48)) {
                result.push(" ");
              }
            }
            result.push(expr.optional ? "?." : ".");
            result.push(generateIdentifier(expr.property));
          }
          return parenthesize(result, Precedence.Member, precedence);
        },
        MetaProperty: function(expr, precedence, flags) {
          var result;
          result = [];
          result.push(typeof expr.meta === "string" ? expr.meta : generateIdentifier(expr.meta));
          result.push(".");
          result.push(typeof expr.property === "string" ? expr.property : generateIdentifier(expr.property));
          return parenthesize(result, Precedence.Member, precedence);
        },
        UnaryExpression: function(expr, precedence, flags) {
          var result, fragment, rightCharCode, leftSource, leftCharCode;
          fragment = this.generateExpression(expr.argument, Precedence.Unary, E_TTT);
          if (space === "") {
            result = join(expr.operator, fragment);
          } else {
            result = [expr.operator];
            if (expr.operator.length > 2) {
              result = join(result, fragment);
            } else {
              leftSource = toSourceNodeWhenNeeded(result).toString();
              leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
              rightCharCode = fragment.toString().charCodeAt(0);
              if ((leftCharCode === 43 || leftCharCode === 45) && leftCharCode === rightCharCode || esutils.code.isIdentifierPartES5(leftCharCode) && esutils.code.isIdentifierPartES5(rightCharCode)) {
                result.push(noEmptySpace());
                result.push(fragment);
              } else {
                result.push(fragment);
              }
            }
          }
          return parenthesize(result, Precedence.Unary, precedence);
        },
        YieldExpression: function(expr, precedence, flags) {
          var result;
          if (expr.delegate) {
            result = "yield*";
          } else {
            result = "yield";
          }
          if (expr.argument) {
            result = join(
              result,
              this.generateExpression(expr.argument, Precedence.Yield, E_TTT)
            );
          }
          return parenthesize(result, Precedence.Yield, precedence);
        },
        AwaitExpression: function(expr, precedence, flags) {
          var result = join(
            expr.all ? "await*" : "await",
            this.generateExpression(expr.argument, Precedence.Await, E_TTT)
          );
          return parenthesize(result, Precedence.Await, precedence);
        },
        UpdateExpression: function(expr, precedence, flags) {
          if (expr.prefix) {
            return parenthesize(
              [
                expr.operator,
                this.generateExpression(expr.argument, Precedence.Unary, E_TTT)
              ],
              Precedence.Unary,
              precedence
            );
          }
          return parenthesize(
            [
              this.generateExpression(expr.argument, Precedence.Postfix, E_TTT),
              expr.operator
            ],
            Precedence.Postfix,
            precedence
          );
        },
        FunctionExpression: function(expr, precedence, flags) {
          var result = [
            generateAsyncPrefix(expr, true),
            "function"
          ];
          if (expr.id) {
            result.push(generateStarSuffix(expr) || noEmptySpace());
            result.push(generateIdentifier(expr.id));
          } else {
            result.push(generateStarSuffix(expr) || space);
          }
          result.push(this.generateFunctionBody(expr));
          return result;
        },
        ArrayPattern: function(expr, precedence, flags) {
          return this.ArrayExpression(expr, precedence, flags, true);
        },
        ArrayExpression: function(expr, precedence, flags, isPattern) {
          var result, multiline, that = this;
          if (!expr.elements.length) {
            return "[]";
          }
          multiline = isPattern ? false : expr.elements.length > 1;
          result = ["[", multiline ? newline : ""];
          withIndent(function(indent2) {
            var i, iz;
            for (i = 0, iz = expr.elements.length; i < iz; ++i) {
              if (!expr.elements[i]) {
                if (multiline) {
                  result.push(indent2);
                }
                if (i + 1 === iz) {
                  result.push(",");
                }
              } else {
                result.push(multiline ? indent2 : "");
                result.push(that.generateExpression(expr.elements[i], Precedence.Assignment, E_TTT));
              }
              if (i + 1 < iz) {
                result.push("," + (multiline ? newline : space));
              }
            }
          });
          if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
            result.push(newline);
          }
          result.push(multiline ? base : "");
          result.push("]");
          return result;
        },
        RestElement: function(expr, precedence, flags) {
          return "..." + this.generatePattern(expr.argument);
        },
        ClassExpression: function(expr, precedence, flags) {
          var result, fragment;
          result = ["class"];
          if (expr.id) {
            result = join(result, this.generateExpression(expr.id, Precedence.Sequence, E_TTT));
          }
          if (expr.superClass) {
            fragment = join("extends", this.generateExpression(expr.superClass, Precedence.Unary, E_TTT));
            result = join(result, fragment);
          }
          result.push(space);
          result.push(this.generateStatement(expr.body, S_TFFT));
          return result;
        },
        MethodDefinition: function(expr, precedence, flags) {
          var result, fragment;
          if (expr["static"]) {
            result = ["static" + space];
          } else {
            result = [];
          }
          if (expr.kind === "get" || expr.kind === "set") {
            fragment = [
              join(expr.kind, this.generatePropertyKey(expr.key, expr.computed)),
              this.generateFunctionBody(expr.value)
            ];
          } else {
            fragment = [
              generateMethodPrefix(expr),
              this.generatePropertyKey(expr.key, expr.computed),
              this.generateFunctionBody(expr.value)
            ];
          }
          return join(result, fragment);
        },
        Property: function(expr, precedence, flags) {
          if (expr.kind === "get" || expr.kind === "set") {
            return [
              expr.kind,
              noEmptySpace(),
              this.generatePropertyKey(expr.key, expr.computed),
              this.generateFunctionBody(expr.value)
            ];
          }
          if (expr.shorthand) {
            if (expr.value.type === "AssignmentPattern") {
              return this.AssignmentPattern(expr.value, Precedence.Sequence, E_TTT);
            }
            return this.generatePropertyKey(expr.key, expr.computed);
          }
          if (expr.method) {
            return [
              generateMethodPrefix(expr),
              this.generatePropertyKey(expr.key, expr.computed),
              this.generateFunctionBody(expr.value)
            ];
          }
          return [
            this.generatePropertyKey(expr.key, expr.computed),
            ":" + space,
            this.generateExpression(expr.value, Precedence.Assignment, E_TTT)
          ];
        },
        ObjectExpression: function(expr, precedence, flags) {
          var multiline, result, fragment, that = this;
          if (!expr.properties.length) {
            return "{}";
          }
          multiline = expr.properties.length > 1;
          withIndent(function() {
            fragment = that.generateExpression(expr.properties[0], Precedence.Sequence, E_TTT);
          });
          if (!multiline) {
            if (!hasLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
              return ["{", space, fragment, space, "}"];
            }
          }
          withIndent(function(indent2) {
            var i, iz;
            result = ["{", newline, indent2, fragment];
            if (multiline) {
              result.push("," + newline);
              for (i = 1, iz = expr.properties.length; i < iz; ++i) {
                result.push(indent2);
                result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
                if (i + 1 < iz) {
                  result.push("," + newline);
                }
              }
            }
          });
          if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
            result.push(newline);
          }
          result.push(base);
          result.push("}");
          return result;
        },
        AssignmentPattern: function(expr, precedence, flags) {
          return this.generateAssignment(expr.left, expr.right, "=", precedence, flags);
        },
        ObjectPattern: function(expr, precedence, flags) {
          var result, i, iz, multiline, property, that = this;
          if (!expr.properties.length) {
            return "{}";
          }
          multiline = false;
          if (expr.properties.length === 1) {
            property = expr.properties[0];
            if (property.type === Syntax.Property && property.value.type !== Syntax.Identifier) {
              multiline = true;
            }
          } else {
            for (i = 0, iz = expr.properties.length; i < iz; ++i) {
              property = expr.properties[i];
              if (property.type === Syntax.Property && !property.shorthand) {
                multiline = true;
                break;
              }
            }
          }
          result = ["{", multiline ? newline : ""];
          withIndent(function(indent2) {
            var i2, iz2;
            for (i2 = 0, iz2 = expr.properties.length; i2 < iz2; ++i2) {
              result.push(multiline ? indent2 : "");
              result.push(that.generateExpression(expr.properties[i2], Precedence.Sequence, E_TTT));
              if (i2 + 1 < iz2) {
                result.push("," + (multiline ? newline : space));
              }
            }
          });
          if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
            result.push(newline);
          }
          result.push(multiline ? base : "");
          result.push("}");
          return result;
        },
        ThisExpression: function(expr, precedence, flags) {
          return "this";
        },
        Super: function(expr, precedence, flags) {
          return "super";
        },
        Identifier: function(expr, precedence, flags) {
          return generateIdentifier(expr);
        },
        ImportDefaultSpecifier: function(expr, precedence, flags) {
          return generateIdentifier(expr.id || expr.local);
        },
        ImportNamespaceSpecifier: function(expr, precedence, flags) {
          var result = ["*"];
          var id = expr.id || expr.local;
          if (id) {
            result.push(space + "as" + noEmptySpace() + generateIdentifier(id));
          }
          return result;
        },
        ImportSpecifier: function(expr, precedence, flags) {
          var imported = expr.imported;
          var result = [imported.name];
          var local = expr.local;
          if (local && local.name !== imported.name) {
            result.push(noEmptySpace() + "as" + noEmptySpace() + generateIdentifier(local));
          }
          return result;
        },
        ExportSpecifier: function(expr, precedence, flags) {
          var local = expr.local;
          var result = [local.name];
          var exported = expr.exported;
          if (exported && exported.name !== local.name) {
            result.push(noEmptySpace() + "as" + noEmptySpace() + generateIdentifier(exported));
          }
          return result;
        },
        Literal: function(expr, precedence, flags) {
          var raw;
          if (expr.hasOwnProperty("raw") && parse && extra.raw) {
            try {
              raw = parse(expr.raw).body[0].expression;
              if (raw.type === Syntax.Literal) {
                if (raw.value === expr.value) {
                  return expr.raw;
                }
              }
            } catch (e) {
            }
          }
          if (expr.regex) {
            return "/" + expr.regex.pattern + "/" + expr.regex.flags;
          }
          if (typeof expr.value === "bigint") {
            return expr.value.toString() + "n";
          }
          if (expr.bigint) {
            return expr.bigint + "n";
          }
          if (expr.value === null) {
            return "null";
          }
          if (typeof expr.value === "string") {
            return escapeString(expr.value);
          }
          if (typeof expr.value === "number") {
            return generateNumber(expr.value);
          }
          if (typeof expr.value === "boolean") {
            return expr.value ? "true" : "false";
          }
          return generateRegExp(expr.value);
        },
        GeneratorExpression: function(expr, precedence, flags) {
          return this.ComprehensionExpression(expr, precedence, flags);
        },
        ComprehensionExpression: function(expr, precedence, flags) {
          var result, i, iz, fragment, that = this;
          result = expr.type === Syntax.GeneratorExpression ? ["("] : ["["];
          if (extra.moz.comprehensionExpressionStartsWithAssignment) {
            fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);
            result.push(fragment);
          }
          if (expr.blocks) {
            withIndent(function() {
              for (i = 0, iz = expr.blocks.length; i < iz; ++i) {
                fragment = that.generateExpression(expr.blocks[i], Precedence.Sequence, E_TTT);
                if (i > 0 || extra.moz.comprehensionExpressionStartsWithAssignment) {
                  result = join(result, fragment);
                } else {
                  result.push(fragment);
                }
              }
            });
          }
          if (expr.filter) {
            result = join(result, "if" + space);
            fragment = this.generateExpression(expr.filter, Precedence.Sequence, E_TTT);
            result = join(result, ["(", fragment, ")"]);
          }
          if (!extra.moz.comprehensionExpressionStartsWithAssignment) {
            fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);
            result = join(result, fragment);
          }
          result.push(expr.type === Syntax.GeneratorExpression ? ")" : "]");
          return result;
        },
        ComprehensionBlock: function(expr, precedence, flags) {
          var fragment;
          if (expr.left.type === Syntax.VariableDeclaration) {
            fragment = [
              expr.left.kind,
              noEmptySpace(),
              this.generateStatement(expr.left.declarations[0], S_FFFF)
            ];
          } else {
            fragment = this.generateExpression(expr.left, Precedence.Call, E_TTT);
          }
          fragment = join(fragment, expr.of ? "of" : "in");
          fragment = join(fragment, this.generateExpression(expr.right, Precedence.Sequence, E_TTT));
          return ["for" + space + "(", fragment, ")"];
        },
        SpreadElement: function(expr, precedence, flags) {
          return [
            "...",
            this.generateExpression(expr.argument, Precedence.Assignment, E_TTT)
          ];
        },
        TaggedTemplateExpression: function(expr, precedence, flags) {
          var itemFlags = E_TTF;
          if (!(flags & F_ALLOW_CALL)) {
            itemFlags = E_TFF;
          }
          var result = [
            this.generateExpression(expr.tag, Precedence.Call, itemFlags),
            this.generateExpression(expr.quasi, Precedence.Primary, E_FFT)
          ];
          return parenthesize(result, Precedence.TaggedTemplate, precedence);
        },
        TemplateElement: function(expr, precedence, flags) {
          return expr.value.raw;
        },
        TemplateLiteral: function(expr, precedence, flags) {
          var result, i, iz;
          result = ["`"];
          for (i = 0, iz = expr.quasis.length; i < iz; ++i) {
            result.push(this.generateExpression(expr.quasis[i], Precedence.Primary, E_TTT));
            if (i + 1 < iz) {
              result.push("${" + space);
              result.push(this.generateExpression(expr.expressions[i], Precedence.Sequence, E_TTT));
              result.push(space + "}");
            }
          }
          result.push("`");
          return result;
        },
        ModuleSpecifier: function(expr, precedence, flags) {
          return this.Literal(expr, precedence, flags);
        },
        ImportExpression: function(expr, precedence, flag) {
          return parenthesize([
            "import(",
            this.generateExpression(expr.source, Precedence.Assignment, E_TTT),
            ")"
          ], Precedence.Call, precedence);
        }
      };
      merge(CodeGenerator.prototype, CodeGenerator.Expression);
      CodeGenerator.prototype.generateExpression = function(expr, precedence, flags) {
        var result, type;
        type = expr.type || Syntax.Property;
        if (extra.verbatim && expr.hasOwnProperty(extra.verbatim)) {
          return generateVerbatim(expr, precedence);
        }
        result = this[type](expr, precedence, flags);
        if (extra.comment) {
          result = addComments(expr, result);
        }
        return toSourceNodeWhenNeeded(result, expr);
      };
      CodeGenerator.prototype.generateStatement = function(stmt, flags) {
        var result, fragment;
        result = this[stmt.type](stmt, flags);
        if (extra.comment) {
          result = addComments(stmt, result);
        }
        fragment = toSourceNodeWhenNeeded(result).toString();
        if (stmt.type === Syntax.Program && !safeConcatenation && newline === "" && fragment.charAt(fragment.length - 1) === "\n") {
          result = sourceMap ? toSourceNodeWhenNeeded(result).replaceRight(/\s+$/, "") : fragment.replace(/\s+$/, "");
        }
        return toSourceNodeWhenNeeded(result, stmt);
      };
      function generateInternal(node) {
        var codegen;
        codegen = new CodeGenerator();
        if (isStatement(node)) {
          return codegen.generateStatement(node, S_TFFF);
        }
        if (isExpression(node)) {
          return codegen.generateExpression(node, Precedence.Sequence, E_TTT);
        }
        throw new Error("Unknown node type: " + node.type);
      }
      function generate(node, options) {
        var defaultOptions = getDefaultOptions(), result, pair;
        if (options != null) {
          if (typeof options.indent === "string") {
            defaultOptions.format.indent.style = options.indent;
          }
          if (typeof options.base === "number") {
            defaultOptions.format.indent.base = options.base;
          }
          options = updateDeeply(defaultOptions, options);
          indent = options.format.indent.style;
          if (typeof options.base === "string") {
            base = options.base;
          } else {
            base = stringRepeat(indent, options.format.indent.base);
          }
        } else {
          options = defaultOptions;
          indent = options.format.indent.style;
          base = stringRepeat(indent, options.format.indent.base);
        }
        json = options.format.json;
        renumber = options.format.renumber;
        hexadecimal = json ? false : options.format.hexadecimal;
        quotes = json ? "double" : options.format.quotes;
        escapeless = options.format.escapeless;
        newline = options.format.newline;
        space = options.format.space;
        if (options.format.compact) {
          newline = space = indent = base = "";
        }
        parentheses = options.format.parentheses;
        semicolons = options.format.semicolons;
        safeConcatenation = options.format.safeConcatenation;
        directive = options.directive;
        parse = json ? null : options.parse;
        sourceMap = options.sourceMap;
        sourceCode = options.sourceCode;
        preserveBlankLines = options.format.preserveBlankLines && sourceCode !== null;
        extra = options;
        if (sourceMap) {
          if (!exports.browser) {
            SourceNode = require_source_map().SourceNode;
          } else {
            SourceNode = global.sourceMap.SourceNode;
          }
        }
        result = generateInternal(node);
        if (!sourceMap) {
          pair = { code: result.toString(), map: null };
          return options.sourceMapWithCode ? pair : pair.code;
        }
        pair = result.toStringWithSourceMap({
          file: options.file,
          sourceRoot: options.sourceMapRoot
        });
        if (options.sourceContent) {
          pair.map.setSourceContent(
            options.sourceMap,
            options.sourceContent
          );
        }
        if (options.sourceMapWithCode) {
          return pair;
        }
        return pair.map.toString();
      }
      FORMAT_MINIFY = {
        indent: {
          style: "",
          base: 0
        },
        renumber: true,
        hexadecimal: true,
        quotes: "auto",
        escapeless: true,
        compact: true,
        parentheses: false,
        semicolons: false
      };
      FORMAT_DEFAULTS = getDefaultOptions().format;
      exports.version = require_package().version;
      exports.generate = generate;
      exports.attachComments = estraverse.attachComments;
      exports.Precedence = updateDeeply({}, Precedence);
      exports.browser = false;
      exports.FORMAT_MINIFY = FORMAT_MINIFY;
      exports.FORMAT_DEFAULTS = FORMAT_DEFAULTS;
    })();
  }
});

export {
  require_escodegen
};
//# sourceMappingURL=chunk-RBYPRZUD.js.map
