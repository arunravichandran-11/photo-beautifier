import React, { useEffect, useRef, useState } from "react";
import "./ImageUploader.scss";
import { AlbumConfig } from "../../../config";
import { RaisedButton } from "../../../components/core/Button";

import { validateFileUploaded } from "../../../utils/fileValidator";

interface ImageUploaderProps {
  getUploadedFile: (e: File) => void;
}

/**
 * A Image Uploaded Component
 * @returns { JSX }
 */
const ImageUploader = ({ getUploadedFile }: ImageUploaderProps) => {
  const previewRef = useRef<HTMLImageElement | null>(null);
  const acceptedImageTypes = AlbumConfig.acceptedImageTypes;

  const fileExtensions = AlbumConfig.acceptedFileExtension;

  const [isLoading, setLoading] = React.useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>();

  /**
   * Set the preview of the file by extracting data url using FileReader result.
   * @param {File} file Uploaded File
   */
  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      const preview = previewRef.current;
      const dataUrl: string | ArrayBuffer | null = reader.result;
      if (preview && dataUrl) {
        preview.setAttribute("src", dataUrl.toString());
      }
      setTimeout(() => {
        setUploadedFile(file);
        setLoading(false);
      }, 1000);
    };
  };

  /**
   * On file upload, validate the file and process it to preview.
   * @param event
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | null) => {
    setLoading(true);
    if (event && event.target && event.target.files) {
      const file: File = event.target.files[0];

      const fileError = validateFileUploaded(file, acceptedImageTypes);

      if (!fileError) {
        processFile(file);
      }
    }
  };

  /**
   * On file drop, validate the file and process it to preview.
   * @param {Event} e
   */
  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
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
      const preview = previewRef.current;
      if (preview) {
        preview.style.display = "block";
      }
    }
  }, [uploadedFile]);

  /**
   * Set the uploaded file to the board
   */
  const handleProcess = () => {
    if (uploadedFile) {
      getUploadedFile(uploadedFile);
    }
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
            ref={previewRef}
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
        <RaisedButton onClick={handleProcess} disabled={!uploadedFile}>
          Process
        </RaisedButton>
      </div>
    </div>
  );
};

export default ImageUploader;
