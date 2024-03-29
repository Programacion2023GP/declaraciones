import {
  require_client
} from "./chunk-PIYNT7D7.js";
import {
  require_react
} from "./chunk-W4PG3SAP.js";
import {
  __toESM
} from "./chunk-WGAPYIUP.js";

// node_modules/@storybook/react-dom-shim/dist/react-18.mjs
var import_react = __toESM(require_react(), 1);
var import_client = __toESM(require_client(), 1);
var nodes = /* @__PURE__ */ new Map();
var WithCallback = ({ callback, children }) => {
  let once = (0, import_react.useRef)();
  return (0, import_react.useLayoutEffect)(() => {
    once.current !== callback && (once.current = callback, callback());
  }, [callback]), children;
};
var renderElement = async (node, el) => {
  let root = await getReactRoot(el);
  return new Promise((resolve) => {
    root.render(import_react.default.createElement(WithCallback, { callback: () => resolve(null) }, node));
  });
};
var unmountElement = (el, shouldUseNewRootApi) => {
  let root = nodes.get(el);
  root && (root.unmount(), nodes.delete(el));
};
var getReactRoot = async (el) => {
  let root = nodes.get(el);
  return root || (root = import_client.default.createRoot(el), nodes.set(el, root)), root;
};

export {
  renderElement,
  unmountElement
};
//# sourceMappingURL=chunk-2YUHFS55.js.map
