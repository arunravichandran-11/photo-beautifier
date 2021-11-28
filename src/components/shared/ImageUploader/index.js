import React, { useEffect } from "react";
import "./ImageUploader.scss";
import Button from "../../core/Button/index";

import { validateFileUploaded } from "../../../utils/fileValidator";

const ImageUploader = ({ getUploadedFile }) => {
  const acceptedImageTypes = [
    "image/gif",
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  const fileExtensions = ".png,.jpg,.jpeg,.webp";

  const [isLoading, setLoading] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState(false);

  const processFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      const preview = document.getElementById("previewImage");
      preview.setAttribute("src", reader.result);
      setTimeout(() => {
        setUploadedFile(file);
        setLoading(false);
      }, 1000);
    };
  };

  const handleChange = (e) => {
    setLoading(true);
    const file = e.target.files[0];

    const fileError = validateFileUploaded(file, acceptedImageTypes);

    if (!fileError) {
      processFile(file);
    }
  };

  const dropHandler = (e) => {
    e.preventDefault();
    const dt = e.dataTransfer;
    const { files } = dt;

    const fileError = validateFileUploaded(files[0], acceptedImageTypes);

    if (!fileError) {
      processFile(files[0]);
    }
  };

  useEffect(() => {
    if (uploadedFile) {
      const preview = document.getElementById("previewImage");
      preview.style.display = "block";
    }
  }, [uploadedFile]);

  const handleProcess = () => {
    getUploadedFile(uploadedFile);
  };

  return (
    <div className="upload-area">
      <div className="upload-area-header">
        <h1 className="title">Upload your file</h1>
        <p className="instruction">
          File should be an image
          <strong className="tooltip">
            Like
            <span className="tooltip-data">{fileExtensions}</span>
          </strong>
        </p>
      </div>
      <div
        className="upload-drag-drop-container drop-zone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={dropHandler}
      >
        <label htmlFor="fileInput">
          {!isLoading && !uploadedFile && (
            <>
              <span className="file-upload-icon">
                <i className="fa-solid fa-image"></i>
              </span>
              <p className="upload-action-message">
                Drop your file here or Click to browse
              </p>
            </>
          )}
          {isLoading && (
            <span id="loadingText" className="loading-text">
              Please Wait
            </span>
          )}
          <img
            src=""
            alt="previewUpload"
            id="previewImage"
            className="preview-image"
            draggable="false"
            style={{ display: "none" }}
          />

          <input
            type="file"
            id="fileInput"
            className="file-input"
            accept={fileExtensions}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="action-panel">
        <Button type="raised" onClick={handleProcess} disabled={!uploadedFile}>
          Process
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;
