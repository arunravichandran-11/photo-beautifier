import React from "react";
import "./ImageFilters.scss";
import Slider from "../../core/Slider";
import { AlbumConfig } from "../../../config";
import { PHOTO_FILTERS } from "../../../constants/types";

interface ImageFiltersProps {
  onFilterChange: (e: PHOTO_FILTERS) => void;
}

const ImageFilters = ({ onFilterChange }: ImageFiltersProps) => {
  const [filters, setFilters] = React.useState(AlbumConfig.defaultImageFilters);

  /**
   * Apply the filter changes to the state of the component.
   * @param {Event} e
   */
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
