import {
  entry_preview_exports
} from "./chunk-FI5JT2WD.js";
import "./chunk-KFLF6BLQ.js";
import "./chunk-2YUHFS55.js";
import {
  require_preview_api
} from "./chunk-ZHJQLDCC.js";
import {
  require_global
} from "./chunk-R36FFXMJ.js";
import "./chunk-PIYNT7D7.js";
import "./chunk-Y6WERI72.js";
import "./chunk-W4PG3SAP.js";
import {
  __toESM
} from "./chunk-WGAPYIUP.js";

// node_modules/@storybook/react/dist/index.mjs
var import_global = __toESM(require_global(), 1);
var import_preview_api = __toESM(require_preview_api(), 1);
var { window: globalWindow } = import_global.global;
globalWindow && (globalWindow.STORYBOOK_ENV = "react");
function setProjectAnnotations(projectAnnotations) {
  (0, import_preview_api.setProjectAnnotations)(projectAnnotations);
}
function composeStory(story, componentAnnotations, projectAnnotations, exportsName) {
  return (0, import_preview_api.composeStory)(story, componentAnnotations, projectAnnotations, entry_preview_exports, exportsName);
}
function composeStories(csfExports, projectAnnotations) {
  return (0, import_preview_api.composeStories)(csfExports, projectAnnotations, composeStory);
}
var _a;
typeof module < "u" && ((_a = module == null ? void 0 : module.hot) == null ? void 0 : _a.decline());
export {
  composeStories,
  composeStory,
  setProjectAnnotations
};
//# sourceMappingURL=@storybook_react.js.map
