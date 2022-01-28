import React from "react";
import "./Slider.scss";

interface SliderProps {
  label: string;
  name: string;
  slideValue: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const Slider = ({ label, name, slideValue, onChange }: SliderProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="slider-container">
      <div className="label">{label}</div>
      <div className="component-slider">
        <div className="slider">
          <input
            type="range"
            min="0"
            name={name}
            max="100"
            value={slideValue}
            onChange={handleChange}
          />
        </div>
        <div
          className="range-value"
          style={{ left: `calc(${slideValue}% - 10px)` }}
        >
          <span>{slideValue}</span>
        </div>
      </div>
    </div>
  );
};

export default Slider;
