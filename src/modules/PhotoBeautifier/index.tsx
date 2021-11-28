import React, { useState } from "react";
import "./PhotoBeautifier.scss";
import ImportFile from "../Import-Upload/ImportFile";

import ImageUploader from "../../components/shared/ImageUploader";
import ImageFilters from "../../components/shared/ImageFilters";
import Alignment from "../../components/shared/ImageAlignment";

import DrawBoard from "../../components/shared/DrawBoard";
import SidePanel from "../../components/core/SidePanel";
import IconButton from "../../components/core/IconButton";

import { savePrintInformation } from "../../service/api-service";

import {
  defaultImageFilters,
  defaultAlbumDescription,
} from "../../config/image-config";

import {
  PHOTO_FILTERS,
  ALBUM_DESCRIPTION,
  ALIGNMENT,
} from "../../constants/types";

const defaultAlignment = {
  scale: 0,
  horizontal: 0,
  vertical: 0,
};

const PhotoBeautifier = () => {
  let fileNameForDownload;
  const downloadRef = React.useRef<HTMLAnchorElement | null>(null);
  const [canvasProperties, setCanvasProperties] = useState<ALBUM_DESCRIPTION>(
    defaultAlbumDescription
  );
  const [alignment, setAlignment] = React.useState(defaultAlignment);
  const [filters, setFilters] =
    React.useState<PHOTO_FILTERS>(defaultImageFilters);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importedFileDescription, setFileDescription] =
    useState<ALBUM_DESCRIPTION | null>(null);

  const resetAll = () => {
    setFilters(defaultImageFilters);
    setAlignment(defaultAlignment);
    setCanvasProperties(defaultAlbumDescription);
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

  const setImageSrcToDownload = (dataUrl: string) => {
    if (downloadRef && downloadRef.current) {
      downloadRef.current.setAttribute("href", dataUrl);
    }
  };

  const handleUploadedFile = (file: File) => {
    if (file) {
      setSelectedFile(file);
    }
  };

  const getAppliedFilters = (filters: PHOTO_FILTERS) => {
    setFilters(filters);
  };

  if (selectedFile) {
    fileNameForDownload = `${Date.now()}-${selectedFile.name}.jpg`;
  }

  const handleAlignment = (newTransform: ALIGNMENT) => {
    setAlignment(newTransform);
  };

  const handleSelectedFile = (
    fileDescription: ALBUM_DESCRIPTION | undefined
  ) => {
    if (fileDescription) {
      setFileDescription(fileDescription);
    }
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
