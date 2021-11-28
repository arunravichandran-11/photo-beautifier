const isFileOfGivenFormat = (file, fileFormats) =>
  file && fileFormats.includes(file["type"]);

const validateFileUploaded = (file, types) => {
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
