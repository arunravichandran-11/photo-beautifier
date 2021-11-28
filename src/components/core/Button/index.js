import React from "react";
import "./button.scss";
import PropTypes from "prop-types";

const FlatButton = ({ onClick, children, leftIcon, rightIcon, disabled }) => {
  return (
    <button className="react-ui-lib-button flat-button" onClick={onClick} disabled={disabled}>
      {leftIcon && <span className="left-icon">{leftIcon}</span>}
      {children || "Flat Button"}
      {rightIcon && <span className="right-icon">{rightIcon}</span>}
    </button>
  );
};

const OutlinedButton = ({ onClick, children, leftIcon, rightIcon, disabled }) => {
  return (
    <button className="react-ui-lib-button outlined-button" onClick={onClick} disabled={disabled}>
      {leftIcon && <span className="left-icon">{leftIcon}</span>}
      {children || "Button"}
      {rightIcon && <span className="right-icon">{rightIcon}</span>}
    </button>
  );
};

const RaisedButton = ({ onClick, children, leftIcon, rightIcon, disabled }) => {
  return (
    <button className="react-ui-lib-button raised-button" onClick={onClick} type="button" disabled={disabled}>
      {leftIcon && <span className="left-icon">{leftIcon}</span>}
      {children || "Button"}
      {rightIcon && <span className="right-icon">{rightIcon}</span>}
    </button>
  );
};

const Button = (props) => {
  const { onClick, children, type, leftIcon, rightIcon, disabled } = props;
  if (type === "flat") {
    return <FlatButton {...props} />;
  }

  if (type === "outlined") {
    return <OutlinedButton {...props} />;
  }

  if (type === "raised") {
    return <RaisedButton {...props} />;
  }
  return (
    <button className="react-ui-lib-button normal" onClick={onClick} disabled={disabled} type="button">
      {leftIcon && <span className="left-icon">{leftIcon}</span>}

      {children || "Button"}

      {rightIcon && <span className="right-icon">{rightIcon}</span>}
    </button>
  );
};

Button.defaultProps = {
  onClick: () => null,
  children: null,
  type: "normal",
  leftIcon: null,
  rightIcon: null,
  disabled: false
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  // type: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["flat", "raised"]),
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  disabled: PropTypes.bool
};

Button.propTypesDescription = {
  onClick: "Description of on click",
  children: "Description of children",
  type: "Description of on type prop",
  leftIcon: "Description of leftIcon",
  rightIcon: "Description of rightIcon",
  disabled: "Shows the state of disable"
};

export { FlatButton, RaisedButton, OutlinedButton };
export default Button;
