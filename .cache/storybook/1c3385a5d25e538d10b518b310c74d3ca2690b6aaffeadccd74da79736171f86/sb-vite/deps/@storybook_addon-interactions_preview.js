import {
  fn,
  instrument,
  isMockFunction
} from "./chunk-JSOJJK3Z.js";
import "./chunk-M24HVCOE.js";
import "./chunk-KA3SVUA7.js";
import "./chunk-ZHJQLDCC.js";
import "./chunk-R36FFXMJ.js";
import "./chunk-WGAPYIUP.js";

// node_modules/@storybook/addon-interactions/dist/preview.js
var { step: runStep } = instrument({ step: (label, play, context) => play(context) }, { intercept: true });
var traverseArgs = (value, depth = 0, key) => {
  if (depth > 5 || value == null)
    return value;
  if (isMockFunction(value))
    return key && value.mockName(key), value;
  if (typeof value == "function" && "isAction" in value && value.isAction && !("implicit" in value && value.implicit)) {
    let mock = fn(value);
    return key && mock.mockName(key), mock;
  }
  if (Array.isArray(value))
    return depth++, value.map((item) => traverseArgs(item, depth));
  if (typeof value == "object" && value.constructor === Object) {
    depth++;
    for (let [k, v] of Object.entries(value))
      Object.getOwnPropertyDescriptor(value, k).writable && (value[k] = traverseArgs(v, depth, k));
    return value;
  }
  return value;
};
var wrapActionsInSpyFns = ({ initialArgs }) => traverseArgs(initialArgs);
var argsEnhancers = [wrapActionsInSpyFns];
var parameters = { throwPlayFunctionExceptions: false };
export {
  argsEnhancers,
  parameters,
  runStep,
  traverseArgs
};
//# sourceMappingURL=@storybook_addon-interactions_preview.js.map
