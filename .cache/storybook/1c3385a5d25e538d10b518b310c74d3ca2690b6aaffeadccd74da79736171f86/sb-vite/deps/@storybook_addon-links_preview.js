import "./chunk-GYN73ZSA.js";
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

// node_modules/@storybook/addon-links/dist/preview.js
var import_global = __toESM(require_global());
var import_preview_api = __toESM(require_preview_api());
var import_core_events = __toESM(require_core_events());
var PARAM_KEY = "links";
var { document, HTMLElement } = import_global.global;
var navigate = (params) => import_preview_api.addons.getChannel().emit(import_core_events.SELECT_STORY, params);
var linksListener = (e) => {
  let { target } = e;
  if (!(target instanceof HTMLElement))
    return;
  let element = target, { sbKind: kind, sbStory: story } = element.dataset;
  (kind || story) && (e.preventDefault(), navigate({ kind, story }));
};
var hasListener = false;
var on = () => {
  hasListener || (hasListener = true, document.addEventListener("click", linksListener));
};
var off = () => {
  hasListener && (hasListener = false, document.removeEventListener("click", linksListener));
};
var withLinks = (0, import_preview_api.makeDecorator)({ name: "withLinks", parameterName: PARAM_KEY, wrapper: (getStory, context) => (on(), import_preview_api.addons.getChannel().once(import_core_events.STORY_CHANGED, off), getStory(context)) });
var decorators = [withLinks];
export {
  decorators
};
//# sourceMappingURL=@storybook_addon-links_preview.js.map
