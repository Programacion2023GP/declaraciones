import {
  defaultTheme_default,
  identifier_default,
  init_defaultTheme,
  init_identifier,
  useTheme_default
} from "./chunk-JFEHI3HA.js";
import {
  require_react
} from "./chunk-W4PG3SAP.js";
import {
  __toESM
} from "./chunk-WGAPYIUP.js";

// node_modules/@mui/material/styles/useTheme.js
var React = __toESM(require_react());
init_defaultTheme();
init_identifier();
function useTheme() {
  const theme = useTheme_default(defaultTheme_default);
  if (true) {
    React.useDebugValue(theme);
  }
  return theme[identifier_default] || theme;
}

export {
  useTheme
};
//# sourceMappingURL=chunk-42M4V7BO.js.map
