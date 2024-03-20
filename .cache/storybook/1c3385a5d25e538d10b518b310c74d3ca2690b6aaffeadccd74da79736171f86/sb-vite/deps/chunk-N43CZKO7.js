import {
  require_react
} from "./chunk-W4PG3SAP.js";
import {
  __esm,
  __toESM
} from "./chunk-WGAPYIUP.js";

// node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js
var React, syncFallback, useInsertionEffect2, useInsertionEffectAlwaysWithSyncFallback, useInsertionEffectWithLayoutFallback;
var init_emotion_use_insertion_effect_with_fallbacks_browser_esm = __esm({
  "node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js"() {
    React = __toESM(require_react());
    syncFallback = function syncFallback2(create) {
      return create();
    };
    useInsertionEffect2 = React["useInsertionEffect"] ? React["useInsertionEffect"] : false;
    useInsertionEffectAlwaysWithSyncFallback = useInsertionEffect2 || syncFallback;
    useInsertionEffectWithLayoutFallback = useInsertionEffect2 || React.useLayoutEffect;
  }
});

export {
  useInsertionEffectAlwaysWithSyncFallback,
  useInsertionEffectWithLayoutFallback,
  init_emotion_use_insertion_effect_with_fallbacks_browser_esm
};
//# sourceMappingURL=chunk-N43CZKO7.js.map
