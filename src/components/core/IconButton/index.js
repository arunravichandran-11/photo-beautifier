import React from "react";
import "./icon-button.scss";

const IconButton = ({ onClick, children, shadow }) => {
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
