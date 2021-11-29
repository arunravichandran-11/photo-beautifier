import { ALBUM_DESCRIPTION } from "../constants/types";
import { ApiConfig } from "../config";

/**
 * post the album details as json and saved in server
 * @param {ALBUM_DESCRIPTION} canvasProperties
 * @returns { object | error } | Response from print-information API.
 */
const savePrintInformation = async (canvasProperties: ALBUM_DESCRIPTION) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(canvasProperties),
    };

    const url = `${ApiConfig.baseUrl}${ApiConfig.saveToPrintUrl}`;

    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * import the list of all already uploaded files.
 * @returns {object} data - files
 */
const importUploadFiles = async () => {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const url = `${ApiConfig.baseUrl}${ApiConfig.fetchUploadedImageUrl}`;
  const response = await fetch(url, options);

  const { data } = await response.json();

  return data;
};

export { savePrintInformation, importUploadFiles };
