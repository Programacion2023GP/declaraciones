import {
  StepContext_default,
  StepperContext_default
} from "./chunk-TVHCCUVT.js";
import {
  init_integerPropType,
  integerPropType_default
} from "./chunk-UTVDRT6N.js";
import {
  _objectWithoutPropertiesLoose,
  clsx_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  init_clsx,
  init_composeClasses,
  init_generateUtilityClass,
  init_generateUtilityClasses,
  init_objectWithoutPropertiesLoose,
  init_styled,
  init_useThemeProps2 as init_useThemeProps,
  styled_default,
  useThemeProps2 as useThemeProps
} from "./chunk-JFEHI3HA.js";
import {
  require_jsx_runtime
} from "./chunk-ICQUVL5D.js";
import {
  require_prop_types
} from "./chunk-KTBNR4TK.js";
import {
  _extends,
  init_extends
} from "./chunk-ODJQBEI6.js";
import {
  require_react
} from "./chunk-W4PG3SAP.js";
import {
  __toESM
} from "./chunk-WGAPYIUP.js";

// node_modules/@mui/material/Step/Step.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_integerPropType();
init_composeClasses();
init_useThemeProps();
init_styled();

// node_modules/@mui/material/Step/stepClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getStepUtilityClass(slot) {
  return generateUtilityClass("MuiStep", slot);
}
var stepClasses = generateUtilityClasses("MuiStep", ["root", "horizontal", "vertical", "alternativeLabel", "completed"]);
var stepClasses_default = stepClasses;

// node_modules/@mui/material/Step/Step.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded = ["active", "children", "className", "component", "completed", "disabled", "expanded", "index", "last"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    orientation,
    alternativeLabel,
    completed
  } = ownerState;
  const slots = {
    root: ["root", orientation, alternativeLabel && "alternativeLabel", completed && "completed"]
  };
  return composeClasses(slots, getStepUtilityClass, classes);
};
var StepRoot = styled_default("div", {
  name: "MuiStep",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.orientation], ownerState.alternativeLabel && styles.alternativeLabel, ownerState.completed && styles.completed];
  }
})(({
  ownerState
}) => _extends({}, ownerState.orientation === "horizontal" && {
  paddingLeft: 8,
  paddingRight: 8
}, ownerState.alternativeLabel && {
  flex: 1,
  position: "relative"
}));
var Step = React.forwardRef(function Step2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiStep"
  });
  const {
    active: activeProp,
    children,
    className,
    component = "div",
    completed: completedProp,
    disabled: disabledProp,
    expanded = false,
    index,
    last
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const {
    activeStep,
    connector,
    alternativeLabel,
    orientation,
    nonLinear
  } = React.useContext(StepperContext_default);
  let [active = false, completed = false, disabled = false] = [activeProp, completedProp, disabledProp];
  if (activeStep === index) {
    active = activeProp !== void 0 ? activeProp : true;
  } else if (!nonLinear && activeStep > index) {
    completed = completedProp !== void 0 ? completedProp : true;
  } else if (!nonLinear && activeStep < index) {
    disabled = disabledProp !== void 0 ? disabledProp : true;
  }
  const contextValue = React.useMemo(() => ({
    index,
    last,
    expanded,
    icon: index + 1,
    active,
    completed,
    disabled
  }), [index, last, expanded, active, completed, disabled]);
  const ownerState = _extends({}, props, {
    active,
    orientation,
    alternativeLabel,
    completed,
    disabled,
    expanded,
    component
  });
  const classes = useUtilityClasses(ownerState);
  const newChildren = (0, import_jsx_runtime.jsxs)(StepRoot, _extends({
    as: component,
    className: clsx_default(classes.root, className),
    ref,
    ownerState
  }, other, {
    children: [connector && alternativeLabel && index !== 0 ? connector : null, children]
  }));
  return (0, import_jsx_runtime2.jsx)(StepContext_default.Provider, {
    value: contextValue,
    children: connector && !alternativeLabel && index !== 0 ? (0, import_jsx_runtime.jsxs)(React.Fragment, {
      children: [connector, newChildren]
    }) : newChildren
  });
});
true ? Step.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Sets the step as active. Is passed to child components.
   */
  active: import_prop_types.default.bool,
  /**
   * Should be `Step` sub-components such as `StepLabel`, `StepContent`.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: import_prop_types.default.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * If `true`, the step is disabled, will also disable the button if
   * `StepButton` is a child of `Step`. Is passed to child components.
   */
  disabled: import_prop_types.default.bool,
  /**
   * Expand the step.
   * @default false
   */
  expanded: import_prop_types.default.bool,
  /**
   * The position of the step.
   * The prop defaults to the value inherited from the parent Stepper component.
   */
  index: integerPropType_default,
  /**
   * If `true`, the Step is displayed as rendered last.
   * The prop defaults to the value inherited from the parent Stepper component.
   */
  last: import_prop_types.default.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var Step_default = Step;

export {
  getStepUtilityClass,
  stepClasses_default,
  Step_default
};
//# sourceMappingURL=chunk-WRRQNOQD.js.map
