import React from "react";
import "./button.scss";

interface RaisedButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: JSX.Element | string;
  leftIcon: JSX.Element;
  rightIcon: JSX.Element;
  disabled: boolean;
}
const RaisedButton = ({
  onClick,
  children,
  leftIcon,
  rightIcon,
  disabled,
}: RaisedButtonProps) => {
  return (
    <button
      className="react-ui-lib-button raised-button"
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      {leftIcon && <span className="left-icon">{leftIcon}</span>}
      {children || "Button"}
      {rightIcon && <span className="right-icon">{rightIcon}</span>}
    </button>
  );
};

RaisedButton.defaultProps = {
  onClick: () => null,
  children: null,
  leftIcon: null,
  rightIcon: null,
  disabled: false,
};

export { RaisedButton };
