import React, { useEffect } from "react";
import "./ImportFile.scss";

import { importUploadFiles } from "../../../service/api-service";

import { ALBUM_DESCRIPTION } from "../../../constants/types";

interface ImportFileProps {
  onSelect?: (e: ALBUM_DESCRIPTION | undefined) => void;
}

const ImportFile = ({ onSelect }: ImportFileProps) => {
  const [importedFiles, setPreviouslyImportedFiles] = React.useState([]);

  useEffect(() => {
    importUploadFiles().then((result) => {
      setPreviouslyImportedFiles(result);
    });
  }, []);

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
  };

  return (
    <div className="upload-area">
      <div className="upload-area-header">
        <h1 className="title">Import Previously Uploaded</h1>
      </div>
      <div className="photo-list">
        <div className="list-container">{renderFileList()}</div>
      </div>
    </div>
  );
};

export default ImportFile;
