const acceptedImageTypes = [
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const defaultImageFilters = {
  grayScale: "0",
  blur: "0",
  brightness: "100",
  contrast: "100",
};

const defaultDrawingConfig = {
  source: {
    x: 0,
    y: 0,
    width: null,
    height: null,
  },
  destination: {
    x: 0,
    y: 0,
    width: null,
    height: null,
  },
};

export { acceptedImageTypes, defaultImageFilters, defaultDrawingConfig };
