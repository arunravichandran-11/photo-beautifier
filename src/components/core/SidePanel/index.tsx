import React from "react";
import "./SidePanel.scss";

interface SidePanelProps {
  children: JSX.Element | JSX.Element[] | string;
}

const SidePanel = ({ children }: SidePanelProps) => {
  return <div className="side-panel">{children}</div>;
};

export default SidePanel;
