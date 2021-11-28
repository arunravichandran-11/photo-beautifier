const isFileOfGivenFormat = (file: File, fileFormats: string[]) =>
  file && fileFormats.includes(file["type"]);

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
