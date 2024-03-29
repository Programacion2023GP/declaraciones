import {
  require_mapValues
} from "./chunk-NXN5E3JJ.js";
import {
  require_preview_api
} from "./chunk-ZHJQLDCC.js";
import {
  require_doctrine
} from "./chunk-O6FDI4Z2.js";
import {
  __toESM
} from "./chunk-WGAPYIUP.js";

// node_modules/@storybook/docs-tools/dist/index.mjs
var import_mapValues = __toESM(require_mapValues(), 1);
var import_doctrine = __toESM(require_doctrine(), 1);
var import_preview_api = __toESM(require_preview_api(), 1);
var QUOTE_REGEX = /^['"]|['"]$/g;
var trimQuotes = (str2) => str2.replace(QUOTE_REGEX, "");
var includesQuotes = (str2) => QUOTE_REGEX.test(str2);
var parseLiteral = (str2) => {
  let trimmedValue = trimQuotes(str2);
  return includesQuotes(str2) || Number.isNaN(Number(trimmedValue)) ? trimmedValue : Number(trimmedValue);
};
var convertSig = (type) => {
  switch (type.type) {
    case "function":
      return { name: "function" };
    case "object":
      let values = {};
      return type.signature.properties.forEach((prop) => {
        values[prop.key] = convert(prop.value);
      }), { name: "object", value: values };
    default:
      throw new Error(`Unknown: ${type}`);
  }
};
var convert = (type) => {
  let { name, raw } = type, base = {};
  switch (typeof raw < "u" && (base.raw = raw), type.name) {
    case "string":
    case "number":
    case "symbol":
    case "boolean":
      return { ...base, name };
    case "Array":
      return { ...base, name: "array", value: type.elements.map(convert) };
    case "signature":
      return { ...base, ...convertSig(type) };
    case "union":
      let result;
      return type.elements.every((element) => element.name === "literal") ? result = { ...base, name: "enum", value: type.elements.map((v) => parseLiteral(v.value)) } : result = { ...base, name, value: type.elements.map(convert) }, result;
    case "intersection":
      return { ...base, name, value: type.elements.map(convert) };
    default:
      return { ...base, name: "other", value: name };
  }
};
var isLiteral = (type) => type.name === "literal";
var toEnumOption = (element) => element.value.replace(/['|"]/g, "");
var convertSig2 = (type) => {
  switch (type.type) {
    case "function":
      return { name: "function" };
    case "object":
      let values = {};
      return type.signature.properties.forEach((prop) => {
        values[prop.key] = convert2(prop.value);
      }), { name: "object", value: values };
    default:
      throw new Error(`Unknown: ${type}`);
  }
};
var convert2 = (type) => {
  let { name, raw } = type, base = {};
  switch (typeof raw < "u" && (base.raw = raw), type.name) {
    case "literal":
      return { ...base, name: "other", value: type.value };
    case "string":
    case "number":
    case "symbol":
    case "boolean":
      return { ...base, name };
    case "Array":
      return { ...base, name: "array", value: type.elements.map(convert2) };
    case "signature":
      return { ...base, ...convertSig2(type) };
    case "union":
      return type.elements.every(isLiteral) ? { ...base, name: "enum", value: type.elements.map(toEnumOption) } : { ...base, name, value: type.elements.map(convert2) };
    case "intersection":
      return { ...base, name, value: type.elements.map(convert2) };
    default:
      return { ...base, name: "other", value: name };
  }
};
var SIGNATURE_REGEXP = /^\(.*\) => /;
var convert3 = (type) => {
  let { name, raw, computed, value } = type, base = {};
  switch (typeof raw < "u" && (base.raw = raw), name) {
    case "enum": {
      let values2 = computed ? value : value.map((v) => parseLiteral(v.value));
      return { ...base, name, value: values2 };
    }
    case "string":
    case "number":
    case "symbol":
      return { ...base, name };
    case "func":
      return { ...base, name: "function" };
    case "bool":
    case "boolean":
      return { ...base, name: "boolean" };
    case "arrayOf":
    case "array":
      return { ...base, name: "array", value: value && convert3(value) };
    case "object":
      return { ...base, name };
    case "objectOf":
      return { ...base, name, value: convert3(value) };
    case "shape":
    case "exact":
      let values = (0, import_mapValues.default)(value, (field) => convert3(field));
      return { ...base, name: "object", value: values };
    case "union":
      return { ...base, name: "union", value: value.map((v) => convert3(v)) };
    case "instanceOf":
    case "element":
    case "elementType":
    default: {
      if ((name == null ? void 0 : name.indexOf("|")) > 0)
        try {
          let literalValues = name.split("|").map((v) => JSON.parse(v));
          return { ...base, name: "enum", value: literalValues };
        } catch {
        }
      let otherVal = value ? `${name}(${value})` : name, otherName = SIGNATURE_REGEXP.test(name) ? "function" : "other";
      return { ...base, name: otherName, value: otherVal };
    }
  }
};
var convert4 = (docgenInfo) => {
  let { type, tsType, flowType } = docgenInfo;
  return type != null ? convert3(type) : tsType != null ? convert(tsType) : flowType != null ? convert2(flowType) : null;
};
var TypeSystem = ((TypeSystem2) => (TypeSystem2.JAVASCRIPT = "JavaScript", TypeSystem2.FLOW = "Flow", TypeSystem2.TYPESCRIPT = "TypeScript", TypeSystem2.UNKNOWN = "Unknown", TypeSystem2))(TypeSystem || {});
var BLACKLIST = ["null", "undefined"];
function isDefaultValueBlacklisted(value) {
  return BLACKLIST.some((x) => x === value);
}
var str = (obj) => {
  if (!obj)
    return "";
  if (typeof obj == "string")
    return obj;
  throw new Error(`Description: expected string, got: ${JSON.stringify(obj)}`);
};
function hasDocgen(component) {
  return !!component.__docgenInfo;
}
function isValidDocgenSection(docgenSection) {
  return docgenSection != null && Object.keys(docgenSection).length > 0;
}
function getDocgenSection(component, section) {
  return hasDocgen(component) ? component.__docgenInfo[section] : null;
}
function getDocgenDescription(component) {
  return hasDocgen(component) ? str(component.__docgenInfo.description) : "";
}
function containsJsDoc(value) {
  return value != null && value.includes("@");
}
function parse(content, tags) {
  let ast;
  try {
    ast = import_doctrine.default.parse(content ?? "", { tags, sloppy: true });
  } catch (e) {
    throw console.error(e), new Error("Cannot parse JSDoc tags.");
  }
  return ast;
}
var DEFAULT_OPTIONS = { tags: ["param", "arg", "argument", "returns", "ignore", "deprecated"] };
var parseJsDoc = (value, options = DEFAULT_OPTIONS) => {
  if (!containsJsDoc(value))
    return { includesJsDoc: false, ignore: false };
  let jsDocAst = parse(value, options.tags), extractedTags = extractJsDocTags(jsDocAst);
  return extractedTags.ignore ? { includesJsDoc: true, ignore: true } : { includesJsDoc: true, ignore: false, description: jsDocAst.description, extractedTags };
};
function extractJsDocTags(ast) {
  let extractedTags = { params: null, deprecated: null, returns: null, ignore: false };
  for (let i = 0; i < ast.tags.length; i += 1) {
    let tag = ast.tags[i];
    if (tag.title === "ignore") {
      extractedTags.ignore = true;
      break;
    } else
      switch (tag.title) {
        case "param":
        case "arg":
        case "argument": {
          let paramTag = extractParam(tag);
          paramTag != null && (extractedTags.params == null && (extractedTags.params = []), extractedTags.params.push(paramTag));
          break;
        }
        case "deprecated": {
          let deprecatedTag = extractDeprecated(tag);
          deprecatedTag != null && (extractedTags.deprecated = deprecatedTag);
          break;
        }
        case "returns": {
          let returnsTag = extractReturns(tag);
          returnsTag != null && (extractedTags.returns = returnsTag);
          break;
        }
      }
  }
  return extractedTags;
}
function extractParam(tag) {
  let paramName = tag.name;
  return paramName != null && paramName !== "null-null" ? { name: tag.name, type: tag.type, description: tag.description, getPrettyName: () => paramName.includes("null") ? paramName.replace("-null", "").replace(".null", "") : tag.name, getTypeName: () => tag.type != null ? extractTypeName(tag.type) : null } : null;
}
function extractDeprecated(tag) {
  return tag.title != null ? tag.description : null;
}
function extractReturns(tag) {
  return tag.type != null ? { type: tag.type, description: tag.description, getTypeName: () => extractTypeName(tag.type) } : null;
}
function extractTypeName(type) {
  return (type == null ? void 0 : type.type) === "NameExpression" ? type.name : (type == null ? void 0 : type.type) === "RecordType" ? `({${type.fields.map((field) => {
    if (field.type === "FieldType" && field.value != null) {
      let valueTypeName = extractTypeName(field.value);
      return `${field.key}: ${valueTypeName}`;
    }
    return field.key;
  }).join(", ")}})` : (type == null ? void 0 : type.type) === "UnionType" ? `(${type.elements.map(extractTypeName).join("|")})` : (type == null ? void 0 : type.type) === "ArrayType" ? "[]" : (type == null ? void 0 : type.type) === "TypeApplication" && type.expression != null && type.expression.name === "Array" ? `${extractTypeName(type.applications[0])}[]` : (type == null ? void 0 : type.type) === "NullableType" || (type == null ? void 0 : type.type) === "NonNullableType" || (type == null ? void 0 : type.type) === "OptionalType" ? extractTypeName(type.expression) : (type == null ? void 0 : type.type) === "AllLiteral" ? "any" : null;
}
function isTooLongForTypeSummary(value) {
  return value.length > 90;
}
function isTooLongForDefaultValueSummary(value) {
  return value.length > 50;
}
function createSummaryValue(summary, detail) {
  return summary === detail ? { summary } : { summary, detail };
}
function generateUnionElement({ name, value, elements, raw }) {
  return value ?? (elements != null ? elements.map(generateUnionElement).join(" | ") : raw ?? name);
}
function generateUnion({ name, raw, elements }) {
  return elements != null ? createSummaryValue(elements.map(generateUnionElement).join(" | ")) : raw != null ? createSummaryValue(raw.replace(/^\|\s*/, "")) : createSummaryValue(name);
}
function generateFuncSignature({ type, raw }) {
  return raw != null ? createSummaryValue(raw) : createSummaryValue(type);
}
function generateObjectSignature({ type, raw }) {
  return raw != null ? isTooLongForTypeSummary(raw) ? createSummaryValue(type, raw) : createSummaryValue(raw) : createSummaryValue(type);
}
function generateSignature(flowType) {
  let { type } = flowType;
  return type === "object" ? generateObjectSignature(flowType) : generateFuncSignature(flowType);
}
function generateDefault({ name, raw }) {
  return raw != null ? isTooLongForTypeSummary(raw) ? createSummaryValue(name, raw) : createSummaryValue(raw) : createSummaryValue(name);
}
function createType(type) {
  if (type == null)
    return null;
  switch (type.name) {
    case "union":
      return generateUnion(type);
    case "signature":
      return generateSignature(type);
    default:
      return generateDefault(type);
  }
}
function createDefaultValue(defaultValue, type) {
  if (defaultValue != null) {
    let { value } = defaultValue;
    if (!isDefaultValueBlacklisted(value))
      return isTooLongForDefaultValueSummary(value) ? createSummaryValue(type == null ? void 0 : type.name, value) : createSummaryValue(value);
  }
  return null;
}
var createFlowPropDef = (propName, docgenInfo) => {
  let { flowType, description, required, defaultValue } = docgenInfo;
  return { name: propName, type: createType(flowType), required, description, defaultValue: createDefaultValue(defaultValue ?? null, flowType ?? null) };
};
function createType2({ tsType, required }) {
  if (tsType == null)
    return null;
  let typeName = tsType.name;
  return required || (typeName = typeName.replace(" | undefined", "")), createSummaryValue(["Array", "Record", "signature"].includes(tsType.name) ? tsType.raw : typeName);
}
function createDefaultValue2({ defaultValue }) {
  if (defaultValue != null) {
    let { value } = defaultValue;
    if (!isDefaultValueBlacklisted(value))
      return createSummaryValue(value);
  }
  return null;
}
var createTsPropDef = (propName, docgenInfo) => {
  let { description, required } = docgenInfo;
  return { name: propName, type: createType2(docgenInfo), required, description, defaultValue: createDefaultValue2(docgenInfo) };
};
function createType3(type) {
  return type != null ? createSummaryValue(type.name) : null;
}
function isReactDocgenTypescript(defaultValue) {
  let { computed, func } = defaultValue;
  return typeof computed > "u" && typeof func > "u";
}
function isStringValued(type) {
  return type ? type.name === "string" ? true : type.name === "enum" ? Array.isArray(type.value) && type.value.every(({ value: tv }) => typeof tv == "string" && tv[0] === '"' && tv[tv.length - 1] === '"') : false : false;
}
function createDefaultValue3(defaultValue, type) {
  if (defaultValue != null) {
    let { value } = defaultValue;
    if (!isDefaultValueBlacklisted(value))
      return isReactDocgenTypescript(defaultValue) && isStringValued(type) ? createSummaryValue(JSON.stringify(value)) : createSummaryValue(value);
  }
  return null;
}
function createBasicPropDef(name, type, docgenInfo) {
  let { description, required, defaultValue } = docgenInfo;
  return { name, type: createType3(type), required, description, defaultValue: createDefaultValue3(defaultValue, type) };
}
function applyJsDocResult(propDef, jsDocParsingResult) {
  var _a;
  if (jsDocParsingResult == null ? void 0 : jsDocParsingResult.includesJsDoc) {
    let { description, extractedTags } = jsDocParsingResult;
    description != null && (propDef.description = jsDocParsingResult.description);
    let value = { ...extractedTags, params: (_a = extractedTags == null ? void 0 : extractedTags.params) == null ? void 0 : _a.map((x) => ({ name: x.getPrettyName(), description: x.description })) };
    Object.values(value).filter(Boolean).length > 0 && (propDef.jsDocTags = value);
  }
  return propDef;
}
var javaScriptFactory = (propName, docgenInfo, jsDocParsingResult) => {
  let propDef = createBasicPropDef(propName, docgenInfo.type, docgenInfo);
  return propDef.sbType = convert4(docgenInfo), applyJsDocResult(propDef, jsDocParsingResult);
};
var tsFactory = (propName, docgenInfo, jsDocParsingResult) => {
  let propDef = createTsPropDef(propName, docgenInfo);
  return propDef.sbType = convert4(docgenInfo), applyJsDocResult(propDef, jsDocParsingResult);
};
var flowFactory = (propName, docgenInfo, jsDocParsingResult) => {
  let propDef = createFlowPropDef(propName, docgenInfo);
  return propDef.sbType = convert4(docgenInfo), applyJsDocResult(propDef, jsDocParsingResult);
};
var unknownFactory = (propName, docgenInfo, jsDocParsingResult) => {
  let propDef = createBasicPropDef(propName, { name: "unknown" }, docgenInfo);
  return applyJsDocResult(propDef, jsDocParsingResult);
};
var getPropDefFactory = (typeSystem) => {
  switch (typeSystem) {
    case "JavaScript":
      return javaScriptFactory;
    case "TypeScript":
      return tsFactory;
    case "Flow":
      return flowFactory;
    default:
      return unknownFactory;
  }
};
var getTypeSystem = (docgenInfo) => docgenInfo.type != null ? "JavaScript" : docgenInfo.flowType != null ? "Flow" : docgenInfo.tsType != null ? "TypeScript" : "Unknown";
var extractComponentSectionArray = (docgenSection) => {
  let typeSystem = getTypeSystem(docgenSection[0]), createPropDef = getPropDefFactory(typeSystem);
  return docgenSection.map((item) => {
    var _a;
    let sanitizedItem = item;
    return ((_a = item.type) == null ? void 0 : _a.elements) && (sanitizedItem = { ...item, type: { ...item.type, value: item.type.elements } }), extractProp(sanitizedItem.name, sanitizedItem, typeSystem, createPropDef);
  });
};
var extractComponentSectionObject = (docgenSection) => {
  let docgenPropsKeys = Object.keys(docgenSection), typeSystem = getTypeSystem(docgenSection[docgenPropsKeys[0]]), createPropDef = getPropDefFactory(typeSystem);
  return docgenPropsKeys.map((propName) => {
    let docgenInfo = docgenSection[propName];
    return docgenInfo != null ? extractProp(propName, docgenInfo, typeSystem, createPropDef) : null;
  }).filter(Boolean);
};
var extractComponentProps = (component, section) => {
  let docgenSection = getDocgenSection(component, section);
  return isValidDocgenSection(docgenSection) ? Array.isArray(docgenSection) ? extractComponentSectionArray(docgenSection) : extractComponentSectionObject(docgenSection) : [];
};
function extractProp(propName, docgenInfo, typeSystem, createPropDef) {
  let jsDocParsingResult = parseJsDoc(docgenInfo.description);
  return jsDocParsingResult.includesJsDoc && jsDocParsingResult.ignore ? null : { propDef: createPropDef(propName, docgenInfo, jsDocParsingResult), jsDocTags: jsDocParsingResult.extractedTags, docgenInfo, typeSystem };
}
function extractComponentDescription(component) {
  return component != null ? getDocgenDescription(component) : "";
}
var enhanceArgTypes = (context) => {
  let { component, argTypes: userArgTypes, parameters: { docs = {} } } = context, { extractArgTypes } = docs, extractedArgTypes = extractArgTypes && component ? extractArgTypes(component) : {};
  return extractedArgTypes ? (0, import_preview_api.combineParameters)(extractedArgTypes, userArgTypes) : userArgTypes;
};
var ADDON_ID = "storybook/docs";
var PANEL_ID = `${ADDON_ID}/panel`;
var SNIPPET_RENDERED = `${ADDON_ID}/snippet-rendered`;
var SourceType = ((SourceType2) => (SourceType2.AUTO = "auto", SourceType2.CODE = "code", SourceType2.DYNAMIC = "dynamic", SourceType2))(SourceType || {});

export {
  TypeSystem,
  hasDocgen,
  getDocgenSection,
  isTooLongForTypeSummary,
  isTooLongForDefaultValueSummary,
  createSummaryValue,
  extractComponentProps,
  extractComponentDescription,
  enhanceArgTypes,
  SNIPPET_RENDERED,
  SourceType
};
//# sourceMappingURL=chunk-S2OIGVBF.js.map
