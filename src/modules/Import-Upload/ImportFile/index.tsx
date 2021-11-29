import React, { useEffect } from "react";
import "./ImportFile.scss";

import { importUploadFiles } from "../../../service/api-service";

import { ALBUM_DESCRIPTION } from "../../../constants/types";

interface ImportFileProps {
  onSelect?: (e: ALBUM_DESCRIPTION | undefined) => void;
}

/**
 * Returns JSX for the Import File Section
 * @returns { JSX }
 */
const ImportFile = ({ onSelect }: ImportFileProps) => {
  const [importedFiles, setPreviouslyImportedFiles] = React.useState([]);

  /**
   * Fetches the previously uploaded files and set it in state.
   */
  useEffect(() => {
    importUploadFiles().then((result) => {
      setPreviouslyImportedFiles(result);
    });
  }, []);

  /**
   * Renders the files list | return no files found
   * @returns { JSX }
   */
  const renderFileList = () => {
    if (importedFiles.length > 0) {
      return importedFiles.map((file: ALBUM_DESCRIPTION) => {
        return (
          <article onClick={() => onSelect && onSelect(file)} key={file.id}>
            <i className="fa-regular fa-file-image"></i>
            <div>
              <h4>{file.id}</h4>
            </div>
          </article>
        );
      });
    }

    return (
      <div className="no-files">
        <h3>No Previous Uploads</h3>
        <h3>Please Upload the image to process</h3>
        <i className="fa-solid fa-hand-point-left"></i>
      </div>
    );
  };

  return (
    <div className="upload-area">
      <div className="upload-area-header">
        <h1 className="title">Import Uploaded</h1>
      </div>
      <div className="photo-list">
        <div className="list-container">{renderFileList()}</div>
      </div>
    </div>
  );
};

export default ImportFile;
