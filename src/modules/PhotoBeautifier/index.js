import React from "react";
import "./PhotoBeautifier.scss";
import ImportFile from "../Import-Upload/ImportFile";

import ImageUploader from "../../components/shared/ImageUploader";
import ImageFilters from "../../components/shared/ImageFilters";
import Alignment from "../../components/shared/ImageAlignment";

import DrawBoard from "../../components/shared/DrawBoard";
import SidePanel from "../../components/core/SidePanel";
import IconButton from "../../components/core/IconButton";

import { savePrintInformation } from "../../service/api-service";

const defaultAlignment = {
  scale: 0,
  left: 0,
  right: 0,
};

const PhotoBeautifier = () => {
  let fileNameForDownload;
  const downloadRef = React.useRef();
  const [canvasProperties, setCanvasProperties] = React.useState({});
  const [alignment, setAlignment] = React.useState(defaultAlignment);
  const [filters, setFilters] = React.useState({});
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [importedFileDescription, setFileDescription] = React.useState(null);

  const resetAll = () => {
    setFilters({});
    setAlignment(defaultAlignment);
    setCanvasProperties({});
    setSelectedFile(null);
    setFileDescription(null);
  };

  const saveDrawBoardAsJSON = async () => {
    if (canvasProperties) {
      const result = await savePrintInformation(canvasProperties);
      if (result.state === "SAVED") {
        resetAll();
      }
    }
  };

  const setImageSrcToDownload = (dataUrl) => {
    downloadRef.current.setAttribute("href", dataUrl);
  };

  const handleUploadedFile = (file) => {
    if (file) {
      setSelectedFile(file);
    }
  };

  const getAppliedFilters = (filters) => {
    setFilters(filters);
  };

  if (selectedFile) {
    fileNameForDownload = `${Date.now()}-${selectedFile.name}.jpg`;
  }

  const handleAlignment = (newTransform) => {
    setAlignment(newTransform);
  };

  const handleSelectedFile = (fileDescription) => {
    setFileDescription(fileDescription);
  };

  const renderAction = (
    <div className="action-container">
      <IconButton shadow onClick={saveDrawBoardAsJSON}>
        <i className="fa-solid fa-floppy-disk"></i>
      </IconButton>
      <a ref={downloadRef} download={fileNameForDownload} href="/">
        <IconButton shadow>
          <i className="fa-solid fa-download"></i>
        </IconButton>
      </a>
    </div>
  );

  const renderBoard = () => {
    if (selectedFile || importedFileDescription) {
      return (
        <div className="area-wrapper">
          <SidePanel>
            {renderAction}
            <ImageFilters onFilterChange={getAppliedFilters} />
            <Alignment onAlignmentChange={handleAlignment} />
          </SidePanel>
          <div className="draw-board">
            <DrawBoard
              file={selectedFile}
              photoDescription={importedFileDescription}
              filters={filters}
              alignment={alignment}
              getCanvasImageUrl={setImageSrcToDownload}
              getCanvasProperties={(data) => setCanvasProperties(data)}
            />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container">
      {renderBoard()}
      {!selectedFile && !importedFileDescription && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <ImageUploader getUploadedFile={handleUploadedFile} />
          <ImportFile onSelect={handleSelectedFile} />
        </div>
      )}
    </div>
  );
};

export default PhotoBeautifier;
