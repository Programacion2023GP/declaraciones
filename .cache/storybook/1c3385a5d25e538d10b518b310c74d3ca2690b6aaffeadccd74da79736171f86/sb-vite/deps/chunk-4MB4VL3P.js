import {
  StepContext_default,
  StepperContext_default
} from "./chunk-TVHCCUVT.js";
import {
  capitalize_default,
  init_capitalize
} from "./chunk-6QC5RLDV.js";
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

// node_modules/@mui/material/Stepper/Stepper.js
init_objectWithoutPropertiesLoose();
init_extends();
var React2 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());
init_clsx();
init_integerPropType();
init_composeClasses();
init_useThemeProps();
init_styled();

// node_modules/@mui/material/Stepper/stepperClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getStepperUtilityClass(slot) {
  return generateUtilityClass("MuiStepper", slot);
}
var stepperClasses = generateUtilityClasses("MuiStepper", ["root", "horizontal", "vertical", "alternativeLabel"]);
var stepperClasses_default = stepperClasses;

// node_modules/@mui/material/StepConnector/StepConnector.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_composeClasses();
init_capitalize();
init_styled();
init_useThemeProps();

// node_modules/@mui/material/StepConnector/stepConnectorClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getStepConnectorUtilityClass(slot) {
  return generateUtilityClass("MuiStepConnector", slot);
}
var stepConnectorClasses = generateUtilityClasses("MuiStepConnector", ["root", "horizontal", "vertical", "alternativeLabel", "active", "completed", "disabled", "line", "lineHorizontal", "lineVertical"]);
var stepConnectorClasses_default = stepConnectorClasses;

// node_modules/@mui/material/StepConnector/StepConnector.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["className"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    orientation,
    alternativeLabel,
    active,
    completed,
    disabled
  } = ownerState;
  const slots = {
    root: ["root", orientation, alternativeLabel && "alternativeLabel", active && "active", completed && "completed", disabled && "disabled"],
    line: ["line", `line${capitalize_default(orientation)}`]
  };
  return composeClasses(slots, getStepConnectorUtilityClass, classes);
};
var StepConnectorRoot = styled_default("div", {
  name: "MuiStepConnector",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.orientation], ownerState.alternativeLabel && styles.alternativeLabel, ownerState.completed && styles.completed];
  }
})(({
  ownerState
}) => _extends({
  flex: "1 1 auto"
}, ownerState.orientation === "vertical" && {
  marginLeft: 12
  // half icon
}, ownerState.alternativeLabel && {
  position: "absolute",
  top: 8 + 4,
  left: "calc(-50% + 20px)",
  right: "calc(50% + 20px)"
}));
var StepConnectorLine = styled_default("span", {
  name: "MuiStepConnector",
  slot: "Line",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.line, styles[`line${capitalize_default(ownerState.orientation)}`]];
  }
})(({
  ownerState,
  theme
}) => {
  const borderColor = theme.palette.mode === "light" ? theme.palette.grey[400] : theme.palette.grey[600];
  return _extends({
    display: "block",
    borderColor: theme.vars ? theme.vars.palette.StepConnector.border : borderColor
  }, ownerState.orientation === "horizontal" && {
    borderTopStyle: "solid",
    borderTopWidth: 1
  }, ownerState.orientation === "vertical" && {
    borderLeftStyle: "solid",
    borderLeftWidth: 1,
    minHeight: 24
  });
});
var StepConnector = React.forwardRef(function StepConnector2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiStepConnector"
  });
  const {
    className
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const {
    alternativeLabel,
    orientation = "horizontal"
  } = React.useContext(StepperContext_default);
  const {
    active,
    disabled,
    completed
  } = React.useContext(StepContext_default);
  const ownerState = _extends({}, props, {
    alternativeLabel,
    orientation,
    active,
    completed,
    disabled
  });
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(StepConnectorRoot, _extends({
    className: clsx_default(classes.root, className),
    ref,
    ownerState
  }, other, {
    children: (0, import_jsx_runtime.jsx)(StepConnectorLine, {
      className: classes.line,
      ownerState
    })
  }));
});
true ? StepConnector.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var StepConnector_default = StepConnector;

// node_modules/@mui/material/Stepper/Stepper.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded2 = ["activeStep", "alternativeLabel", "children", "className", "component", "connector", "nonLinear", "orientation"];
var useUtilityClasses2 = (ownerState) => {
  const {
    orientation,
    alternativeLabel,
    classes
  } = ownerState;
  const slots = {
    root: ["root", orientation, alternativeLabel && "alternativeLabel"]
  };
  return composeClasses(slots, getStepperUtilityClass, classes);
};
var StepperRoot = styled_default("div", {
  name: "MuiStepper",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.orientation], ownerState.alternativeLabel && styles.alternativeLabel];
  }
})(({
  ownerState
}) => _extends({
  display: "flex"
}, ownerState.orientation === "horizontal" && {
  flexDirection: "row",
  alignItems: "center"
}, ownerState.orientation === "vertical" && {
  flexDirection: "column"
}, ownerState.alternativeLabel && {
  alignItems: "flex-start"
}));
var defaultConnector = (0, import_jsx_runtime2.jsx)(StepConnector_default, {});
var Stepper = React2.forwardRef(function Stepper2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiStepper"
  });
  const {
    activeStep = 0,
    alternativeLabel = false,
    children,
    className,
    component = "div",
    connector = defaultConnector,
    nonLinear = false,
    orientation = "horizontal"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
  const ownerState = _extends({}, props, {
    alternativeLabel,
    orientation,
    component
  });
  const classes = useUtilityClasses2(ownerState);
  const childrenArray = React2.Children.toArray(children).filter(Boolean);
  const steps = childrenArray.map((step, index) => {
    return React2.cloneElement(step, _extends({
      index,
      last: index + 1 === childrenArray.length
    }, step.props));
  });
  const contextValue = React2.useMemo(() => ({
    activeStep,
    alternativeLabel,
    connector,
    nonLinear,
    orientation
  }), [activeStep, alternativeLabel, connector, nonLinear, orientation]);
  return (0, import_jsx_runtime2.jsx)(StepperContext_default.Provider, {
    value: contextValue,
    children: (0, import_jsx_runtime2.jsx)(StepperRoot, _extends({
      as: component,
      ownerState,
      className: clsx_default(classes.root, className),
      ref
    }, other, {
      children: steps
    }))
  });
});
true ? Stepper.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Set the active step (zero based index).
   * Set to -1 to disable all the steps.
   * @default 0
   */
  activeStep: integerPropType_default,
  /**
   * If set to 'true' and orientation is horizontal,
   * then the step label will be positioned under the icon.
   * @default false
   */
  alternativeLabel: import_prop_types2.default.bool,
  /**
   * Two or more `<Step />` components.
   */
  children: import_prop_types2.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types2.default.object,
  /**
   * @ignore
   */
  className: import_prop_types2.default.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types2.default.elementType,
  /**
   * An element to be placed between each step.
   * @default <StepConnector />
   */
  connector: import_prop_types2.default.element,
  /**
   * If set the `Stepper` will not assist in controlling steps for linear flow.
   * @default false
   */
  nonLinear: import_prop_types2.default.bool,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: import_prop_types2.default.oneOf(["horizontal", "vertical"]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types2.default.oneOfType([import_prop_types2.default.arrayOf(import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object, import_prop_types2.default.bool])), import_prop_types2.default.func, import_prop_types2.default.object])
} : void 0;
var Stepper_default = Stepper;

export {
  getStepperUtilityClass,
  stepperClasses_default,
  getStepConnectorUtilityClass,
  stepConnectorClasses_default,
  StepConnector_default,
  Stepper_default
};
//# sourceMappingURL=chunk-4MB4VL3P.js.map
