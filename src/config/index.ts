import {
  BASE_URL,
  SAVE_FILE_TO_JSON_URL,
  FETCH_UPLOADED_LIST,
} from "../constants/API_CONSTANTS";

import {
  acceptedImageTypes,
  defaultImageFilters,
  acceptedFileExtension,
  defaultAlignment,
  defaultDrawingConfig,
  defaultAlbumDescription,
} from "./image-config";

const ApiConfig = {
  baseUrl: BASE_URL,
  saveToPrintUrl: SAVE_FILE_TO_JSON_URL,
  fetchUploadedImageUrl: FETCH_UPLOADED_LIST,
};

const AlbumConfig = {
  acceptedFileExtension,
  defaultImageFilters,
  defaultAlignment,
  acceptedImageTypes,
  defaultDrawingConfig,
  defaultAlbumDescription,
};

export { ApiConfig, AlbumConfig };
