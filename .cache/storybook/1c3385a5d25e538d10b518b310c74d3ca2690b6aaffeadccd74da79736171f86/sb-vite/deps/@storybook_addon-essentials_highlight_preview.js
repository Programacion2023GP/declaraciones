import {
  require_core_events
} from "./chunk-M24HVCOE.js";
import {
  require_preview_api
} from "./chunk-ZHJQLDCC.js";
import {
  require_global
} from "./chunk-R36FFXMJ.js";
import {
  __toESM
} from "./chunk-WGAPYIUP.js";

// node_modules/@storybook/addon-highlight/dist/preview.js
var import_global = __toESM(require_global());
var import_preview_api = __toESM(require_preview_api());
var import_core_events = __toESM(require_core_events());
var ADDON_ID = "storybook/highlight";
var HIGHLIGHT_STYLE_ID = "storybookHighlight";
var HIGHLIGHT = `${ADDON_ID}/add`;
var RESET_HIGHLIGHT = `${ADDON_ID}/reset`;
var { document } = import_global.global;
var highlightStyle = (color = "#FF4785", style = "dashed") => `
  outline: 2px ${style} ${color};
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(255,255,255,0.6);
`;
var highlightObject = (color) => ({ outline: `2px dashed ${color}`, outlineOffset: 2, boxShadow: "0 0 0 6px rgba(255,255,255,0.6)" });
var channel = import_preview_api.addons.getChannel();
var highlight = (infos) => {
  let id = HIGHLIGHT_STYLE_ID;
  resetHighlight();
  let elements = Array.from(new Set(infos.elements)), sheet = document.createElement("style");
  sheet.setAttribute("id", id), sheet.innerHTML = elements.map((target) => `${target}{
          ${highlightStyle(infos.color, infos.style)}
         }`).join(" "), document.head.appendChild(sheet);
};
var resetHighlight = () => {
  var _a;
  let id = HIGHLIGHT_STYLE_ID, sheetToBeRemoved = document.getElementById(id);
  sheetToBeRemoved && ((_a = sheetToBeRemoved.parentNode) == null ? void 0 : _a.removeChild(sheetToBeRemoved));
};
channel.on(import_core_events.STORY_CHANGED, resetHighlight);
channel.on(RESET_HIGHLIGHT, resetHighlight);
channel.on(HIGHLIGHT, highlight);
export {
  highlightObject,
  highlightStyle
};
//# sourceMappingURL=@storybook_addon-essentials_highlight_preview.js.map
