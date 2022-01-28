import {
  SUPPORTED_IMAGE_FORMATS,
  SUPPORTED_IMAGE_FILE_EXTENSION,
} from "../constants";

const acceptedImageTypes = SUPPORTED_IMAGE_FORMATS;

const acceptedFileExtension = SUPPORTED_IMAGE_FILE_EXTENSION;

const defaultImageFilters = {
  grayScale: "0",
  blur: "0",
  brightness: "100",
  contrast: "100",
};

const defaultAlignment = {
  scale: 0,
  horizontal: 0,
  vertical: 0,
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

const defaultAlbumDescription = {
  id: "",
  printArea: {
    width: 0,
    height: 0,
  },
  photo: {
    name: "",
    width: 0,
    height: 0,
    src: "",
    x: 0,
    y: 0,
  },
};

export {
  acceptedImageTypes,
  acceptedFileExtension,
  defaultImageFilters,
  defaultAlignment,
  defaultDrawingConfig,
  defaultAlbumDescription,
};
