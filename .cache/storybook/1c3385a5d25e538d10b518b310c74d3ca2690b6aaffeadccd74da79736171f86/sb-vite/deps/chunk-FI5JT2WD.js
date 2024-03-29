import {
  __export
} from "./chunk-KFLF6BLQ.js";
import {
  renderElement,
  unmountElement
} from "./chunk-2YUHFS55.js";
import {
  require_global
} from "./chunk-R36FFXMJ.js";
import {
  require_react
} from "./chunk-W4PG3SAP.js";
import {
  __toESM
} from "./chunk-WGAPYIUP.js";

// node_modules/@storybook/react/dist/chunk-JXRZ2CQ5.mjs
var import_react = __toESM(require_react(), 1);
var import_global = __toESM(require_global(), 1);
var entry_preview_exports = {};
__export(entry_preview_exports, { parameters: () => parameters, render: () => render, renderToCanvas: () => renderToCanvas });
var render = (args, context) => {
  let { id, component: Component2 } = context;
  if (!Component2)
    throw new Error(`Unable to render story ${id} as the component annotation is missing from the default export`);
  return import_react.default.createElement(Component2, { ...args });
};
var { FRAMEWORK_OPTIONS } = import_global.global;
var ErrorBoundary = class extends import_react.Component {
  constructor() {
    super(...arguments);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidMount() {
    let { hasError } = this.state, { showMain } = this.props;
    hasError || showMain();
  }
  componentDidCatch(err) {
    let { showException } = this.props;
    showException(err);
  }
  render() {
    let { hasError } = this.state, { children } = this.props;
    return hasError ? null : children;
  }
};
var Wrapper = (FRAMEWORK_OPTIONS == null ? void 0 : FRAMEWORK_OPTIONS.strictMode) ? import_react.StrictMode : import_react.Fragment;
async function renderToCanvas({ storyContext, unboundStoryFn, showMain, showException, forceRemount }, canvasElement) {
  let content = import_react.default.createElement(ErrorBoundary, { showMain, showException }, import_react.default.createElement(unboundStoryFn, { ...storyContext })), element = Wrapper ? import_react.default.createElement(Wrapper, null, content) : content;
  return forceRemount && unmountElement(canvasElement), await renderElement(element, canvasElement), () => unmountElement(canvasElement);
}
var parameters = { renderer: "react" };

export {
  entry_preview_exports,
  render,
  renderToCanvas,
  parameters
};
//# sourceMappingURL=chunk-FI5JT2WD.js.map
