import React from "react";
import "./ImageFilters.scss";
import Slider from "../../core/Slider";
import { defaultImageFilters } from "../../../config/image-config";
const ImageFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState(defaultImageFilters);

  const handleFilterChange = (e) => {
    const { value, name } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  React.useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  const { grayScale, blur, brightness, contrast } = filters;

  return (
    <div className="filter-section">
      <h4 className="title">Filters</h4>
      <Slider
        label="Gray Scale"
        name="grayScale"
        onChange={handleFilterChange}
        slideValue={grayScale}
      />
      <Slider
        label="Blur"
        name="blur"
        onChange={handleFilterChange}
        slideValue={blur}
      />
      <Slider
        label="Brightness"
        name="brightness"
        onChange={handleFilterChange}
        slideValue={brightness}
      />
      <Slider
        label="Contrast"
        name="contrast"
        onChange={handleFilterChange}
        slideValue={contrast}
      />
    </div>
  );
};

export default ImageFilters;
