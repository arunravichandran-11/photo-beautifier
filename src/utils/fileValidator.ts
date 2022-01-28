/**
 * It checks is the given file is there in the required fileFormats
 * @param {File} file - The user uploaded file.
 * @param {string[]} fileFormats - The support file format to validated against the given file.
 * @returns {boolean} true | false - Returns true or false based on given File matches the formats.
 */

const isFileOfGivenFormat = (file: File, fileFormats: string[]) =>
  file && fileFormats.includes(file["type"]);

/**
 * A basic file validation such as format and file is present.
 * Note(Later, the size of the file has to be validated)
 * @param {File} file - The user uploaded file.
 * @param {string[]} types - The support file format to validated against the given file.
 * @returns {string} errorMessage - return errorMessage based on condition or undefined if no error.
 */

const validateFileUploaded = (file: File, types: string[]) => {
  let errorMessage;

  if (!file) {
    errorMessage = "No file found";
    return errorMessage;
  }

  const isImage = isFileOfGivenFormat(file, types);
  if (!isImage) {
    errorMessage = "You can only upload photo files";
  }

  return errorMessage;
};

export { validateFileUploaded };
