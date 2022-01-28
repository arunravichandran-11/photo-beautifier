import React from "react";
import "./icon-button.scss";

interface IconButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: JSX.Element | string;
  shadow: boolean;
}

const IconButton = ({ onClick, children, shadow }: IconButtonProps) => {
  return (
    <button
      className={`react-ui-lib-icon-button ${shadow ? "shadow" : "flat"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
