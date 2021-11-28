import React, { useEffect } from "react";
import "./ImageAlignment.scss";

const defaultTransform = {
  scale: 0,
  horizontal: 0,
  vertical: 0,
};

const Alignment = ({ onAlignmentChange }) => {
  const [transform, setTransform] = React.useState(defaultTransform);

  const handleChange = (e) => {
    setTransform({
      ...transform,
      scale: e.target.value,
    });
  };

  const onMoveHorizontal = (e) => {
    setTransform({
      ...transform,
      horizontal: e.target.value,
    });
  };

  const onMoveVertical = (e) => {
    setTransform({
      ...transform,
      vertical: e.target.value,
    });
  };

  useEffect(() => {
    if (onAlignmentChange) {
      onAlignmentChange(transform);
    }
  }, [transform]);

  return (
    <div className="component-image-alignment">
      <h3 className="title">Alignment</h3>
      <div className="input-wrapper">
        <label htmlFor="scale">
          <span>Scale</span>
          <input
            type="range"
            id="scale"
            min="-100"
            max="100"
            step={25}
            value={transform.scale}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="input-wrapper">
        <label htmlFor="positionX">
          <span>Horizontal</span>
          <input
            type="number"
            min="-100"
            max="100"
            step="10"
            id="positionX"
            value={transform.horizontal}
            onChange={onMoveHorizontal}
          />
        </label>
      </div>
      <div className="input-wrapper">
        <label htmlFor="positionY">
          <span>Vertical</span>
          <input
            type="number"
            min="-100"
            max="100"
            step="10"
            id="positionY"
            value={transform.vertical}
            onChange={onMoveVertical}
          />
        </label>
      </div>
    </div>
  );
};

export default Alignment;
