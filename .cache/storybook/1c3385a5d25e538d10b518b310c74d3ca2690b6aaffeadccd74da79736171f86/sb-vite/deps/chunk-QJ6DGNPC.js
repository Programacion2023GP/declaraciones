import {
  SvgIcon_default,
  createSvgIcon,
  init_SvgIcon,
  init_createSvgIcon
} from "./chunk-V7ZGT2MK.js";
import {
  StepContext_default,
  StepperContext_default
} from "./chunk-TVHCCUVT.js";
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

// node_modules/@mui/material/StepLabel/StepLabel.js
init_objectWithoutPropertiesLoose();
init_extends();
var React4 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());
init_clsx();
init_composeClasses();
init_styled();
init_useThemeProps();

// node_modules/@mui/material/StepIcon/StepIcon.js
init_extends();
init_objectWithoutPropertiesLoose();
var React3 = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_composeClasses();
init_styled();
init_useThemeProps();

// node_modules/@mui/material/internal/svg-icons/CheckCircle.js
var React = __toESM(require_react());
init_createSvgIcon();
var import_jsx_runtime = __toESM(require_jsx_runtime());
var CheckCircle_default = createSvgIcon((0, import_jsx_runtime.jsx)("path", {
  d: "M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"
}), "CheckCircle");

// node_modules/@mui/material/internal/svg-icons/Warning.js
var React2 = __toESM(require_react());
init_createSvgIcon();
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var Warning_default = createSvgIcon((0, import_jsx_runtime2.jsx)("path", {
  d: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
}), "Warning");

// node_modules/@mui/material/StepIcon/StepIcon.js
init_SvgIcon();

// node_modules/@mui/material/StepIcon/stepIconClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getStepIconUtilityClass(slot) {
  return generateUtilityClass("MuiStepIcon", slot);
}
var stepIconClasses = generateUtilityClasses("MuiStepIcon", ["root", "active", "completed", "error", "text"]);
var stepIconClasses_default = stepIconClasses;

// node_modules/@mui/material/StepIcon/StepIcon.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var _circle;
var _excluded = ["active", "className", "completed", "error", "icon"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    active,
    completed,
    error
  } = ownerState;
  const slots = {
    root: ["root", active && "active", completed && "completed", error && "error"],
    text: ["text"]
  };
  return composeClasses(slots, getStepIconUtilityClass, classes);
};
var StepIconRoot = styled_default(SvgIcon_default, {
  name: "MuiStepIcon",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})(({
  theme
}) => ({
  display: "block",
  transition: theme.transitions.create("color", {
    duration: theme.transitions.duration.shortest
  }),
  color: (theme.vars || theme).palette.text.disabled,
  [`&.${stepIconClasses_default.completed}`]: {
    color: (theme.vars || theme).palette.primary.main
  },
  [`&.${stepIconClasses_default.active}`]: {
    color: (theme.vars || theme).palette.primary.main
  },
  [`&.${stepIconClasses_default.error}`]: {
    color: (theme.vars || theme).palette.error.main
  }
}));
var StepIconText = styled_default("text", {
  name: "MuiStepIcon",
  slot: "Text",
  overridesResolver: (props, styles) => styles.text
})(({
  theme
}) => ({
  fill: (theme.vars || theme).palette.primary.contrastText,
  fontSize: theme.typography.caption.fontSize,
  fontFamily: theme.typography.fontFamily
}));
var StepIcon = React3.forwardRef(function StepIcon2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiStepIcon"
  });
  const {
    active = false,
    className: classNameProp,
    completed = false,
    error = false,
    icon
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    active,
    completed,
    error
  });
  const classes = useUtilityClasses(ownerState);
  if (typeof icon === "number" || typeof icon === "string") {
    const className = clsx_default(classNameProp, classes.root);
    if (error) {
      return (0, import_jsx_runtime3.jsx)(StepIconRoot, _extends({
        as: Warning_default,
        className,
        ref,
        ownerState
      }, other));
    }
    if (completed) {
      return (0, import_jsx_runtime3.jsx)(StepIconRoot, _extends({
        as: CheckCircle_default,
        className,
        ref,
        ownerState
      }, other));
    }
    return (0, import_jsx_runtime4.jsxs)(StepIconRoot, _extends({
      className,
      ref,
      ownerState
    }, other, {
      children: [_circle || (_circle = (0, import_jsx_runtime3.jsx)("circle", {
        cx: "12",
        cy: "12",
        r: "12"
      })), (0, import_jsx_runtime3.jsx)(StepIconText, {
        className: classes.text,
        x: "12",
        y: "12",
        textAnchor: "middle",
        dominantBaseline: "central",
        ownerState,
        children: icon
      })]
    }));
  }
  return icon;
});
true ? StepIcon.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Whether this step is active.
   * @default false
   */
  active: import_prop_types.default.bool,
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
   * @default false
   */
  completed: import_prop_types.default.bool,
  /**
   * If `true`, the step is marked as failed.
   * @default false
   */
  error: import_prop_types.default.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: import_prop_types.default.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var StepIcon_default = StepIcon;

// node_modules/@mui/material/StepLabel/stepLabelClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getStepLabelUtilityClass(slot) {
  return generateUtilityClass("MuiStepLabel", slot);
}
var stepLabelClasses = generateUtilityClasses("MuiStepLabel", ["root", "horizontal", "vertical", "label", "active", "completed", "error", "disabled", "iconContainer", "alternativeLabel", "labelContainer"]);
var stepLabelClasses_default = stepLabelClasses;

// node_modules/@mui/material/StepLabel/StepLabel.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var _excluded2 = ["children", "className", "componentsProps", "error", "icon", "optional", "slotProps", "StepIconComponent", "StepIconProps"];
var useUtilityClasses2 = (ownerState) => {
  const {
    classes,
    orientation,
    active,
    completed,
    error,
    disabled,
    alternativeLabel
  } = ownerState;
  const slots = {
    root: ["root", orientation, error && "error", disabled && "disabled", alternativeLabel && "alternativeLabel"],
    label: ["label", active && "active", completed && "completed", error && "error", disabled && "disabled", alternativeLabel && "alternativeLabel"],
    iconContainer: ["iconContainer", active && "active", completed && "completed", error && "error", disabled && "disabled", alternativeLabel && "alternativeLabel"],
    labelContainer: ["labelContainer", alternativeLabel && "alternativeLabel"]
  };
  return composeClasses(slots, getStepLabelUtilityClass, classes);
};
var StepLabelRoot = styled_default("span", {
  name: "MuiStepLabel",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.orientation]];
  }
})(({
  ownerState
}) => _extends({
  display: "flex",
  alignItems: "center",
  [`&.${stepLabelClasses_default.alternativeLabel}`]: {
    flexDirection: "column"
  },
  [`&.${stepLabelClasses_default.disabled}`]: {
    cursor: "default"
  }
}, ownerState.orientation === "vertical" && {
  textAlign: "left",
  padding: "8px 0"
}));
var StepLabelLabel = styled_default("span", {
  name: "MuiStepLabel",
  slot: "Label",
  overridesResolver: (props, styles) => styles.label
})(({
  theme
}) => _extends({}, theme.typography.body2, {
  display: "block",
  transition: theme.transitions.create("color", {
    duration: theme.transitions.duration.shortest
  }),
  [`&.${stepLabelClasses_default.active}`]: {
    color: (theme.vars || theme).palette.text.primary,
    fontWeight: 500
  },
  [`&.${stepLabelClasses_default.completed}`]: {
    color: (theme.vars || theme).palette.text.primary,
    fontWeight: 500
  },
  [`&.${stepLabelClasses_default.alternativeLabel}`]: {
    marginTop: 16
  },
  [`&.${stepLabelClasses_default.error}`]: {
    color: (theme.vars || theme).palette.error.main
  }
}));
var StepLabelIconContainer = styled_default("span", {
  name: "MuiStepLabel",
  slot: "IconContainer",
  overridesResolver: (props, styles) => styles.iconContainer
})(() => ({
  flexShrink: 0,
  // Fix IE11 issue
  display: "flex",
  paddingRight: 8,
  [`&.${stepLabelClasses_default.alternativeLabel}`]: {
    paddingRight: 0
  }
}));
var StepLabelLabelContainer = styled_default("span", {
  name: "MuiStepLabel",
  slot: "LabelContainer",
  overridesResolver: (props, styles) => styles.labelContainer
})(({
  theme
}) => ({
  width: "100%",
  color: (theme.vars || theme).palette.text.secondary,
  [`&.${stepLabelClasses_default.alternativeLabel}`]: {
    textAlign: "center"
  }
}));
var StepLabel = React4.forwardRef(function StepLabel2(inProps, ref) {
  var _slotProps$label;
  const props = useThemeProps({
    props: inProps,
    name: "MuiStepLabel"
  });
  const {
    children,
    className,
    componentsProps = {},
    error = false,
    icon: iconProp,
    optional,
    slotProps = {},
    StepIconComponent: StepIconComponentProp,
    StepIconProps
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
  const {
    alternativeLabel,
    orientation
  } = React4.useContext(StepperContext_default);
  const {
    active,
    disabled,
    completed,
    icon: iconContext
  } = React4.useContext(StepContext_default);
  const icon = iconProp || iconContext;
  let StepIconComponent = StepIconComponentProp;
  if (icon && !StepIconComponent) {
    StepIconComponent = StepIcon_default;
  }
  const ownerState = _extends({}, props, {
    active,
    alternativeLabel,
    completed,
    disabled,
    error,
    orientation
  });
  const classes = useUtilityClasses2(ownerState);
  const labelSlotProps = (_slotProps$label = slotProps.label) != null ? _slotProps$label : componentsProps.label;
  return (0, import_jsx_runtime6.jsxs)(StepLabelRoot, _extends({
    className: clsx_default(classes.root, className),
    ref,
    ownerState
  }, other, {
    children: [icon || StepIconComponent ? (0, import_jsx_runtime5.jsx)(StepLabelIconContainer, {
      className: classes.iconContainer,
      ownerState,
      children: (0, import_jsx_runtime5.jsx)(StepIconComponent, _extends({
        completed,
        active,
        error,
        icon
      }, StepIconProps))
    }) : null, (0, import_jsx_runtime6.jsxs)(StepLabelLabelContainer, {
      className: classes.labelContainer,
      ownerState,
      children: [children ? (0, import_jsx_runtime5.jsx)(StepLabelLabel, _extends({
        ownerState
      }, labelSlotProps, {
        className: clsx_default(classes.label, labelSlotProps == null ? void 0 : labelSlotProps.className),
        children
      })) : null, optional]
    })]
  }));
});
true ? StepLabel.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * In most cases will simply be a string containing a title for the label.
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
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps: import_prop_types2.default.shape({
    label: import_prop_types2.default.object
  }),
  /**
   * If `true`, the step is marked as failed.
   * @default false
   */
  error: import_prop_types2.default.bool,
  /**
   * Override the default label of the step icon.
   */
  icon: import_prop_types2.default.node,
  /**
   * The optional node to display.
   */
  optional: import_prop_types2.default.node,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: import_prop_types2.default.shape({
    label: import_prop_types2.default.object
  }),
  /**
   * The component to render in place of the [`StepIcon`](/material-ui/api/step-icon/).
   */
  StepIconComponent: import_prop_types2.default.elementType,
  /**
   * Props applied to the [`StepIcon`](/material-ui/api/step-icon/) element.
   */
  StepIconProps: import_prop_types2.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types2.default.oneOfType([import_prop_types2.default.arrayOf(import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object, import_prop_types2.default.bool])), import_prop_types2.default.func, import_prop_types2.default.object])
} : void 0;
StepLabel.muiName = "StepLabel";
var StepLabel_default = StepLabel;

export {
  getStepIconUtilityClass,
  stepIconClasses_default,
  StepIcon_default,
  getStepLabelUtilityClass,
  stepLabelClasses_default,
  StepLabel_default
};
//# sourceMappingURL=chunk-QJ6DGNPC.js.map
