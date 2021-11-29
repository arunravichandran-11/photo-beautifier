import React, { useState } from "react";
import "./PhotoBeautifier.scss";
import ImportFile from "../Import-Upload/ImportFile";
import ImageUploader from "../Import-Upload/ImageUploader";

import ImageFilters from "../../components/shared/ImageFilters";
import Alignment from "../../components/shared/ImageAlignment";
import DrawBoard from "../../components/shared/DrawBoard";

import SidePanel from "../../components/core/SidePanel";
import IconButton from "../../components/core/IconButton";

import { savePrintInformation } from "../../service/api-service";
import { AlbumConfig } from "../../config";
import {
  PHOTO_FILTERS,
  ALBUM_DESCRIPTION,
  ALIGNMENT,
} from "../../constants/types";

const PhotoBeautifier = () => {
  let fileNameForDownload;
  const downloadRef = React.useRef<HTMLAnchorElement | null>(null);
  const [canvasProperties, setCanvasProperties] = useState<ALBUM_DESCRIPTION>(
    AlbumConfig.defaultAlbumDescription
  );
  const [alignment, setAlignment] = React.useState(
    AlbumConfig.defaultAlignment
  );
  const [filters, setFilters] = React.useState<PHOTO_FILTERS>(
    AlbumConfig.defaultImageFilters
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importedFileDescription, setFileDescription] =
    useState<ALBUM_DESCRIPTION | null>(null);

  /**
   * reset all state and move to upload page after successful save/submit
   */
  const resetAll = () => {
    setFilters(AlbumConfig.defaultImageFilters);
    setAlignment(AlbumConfig.defaultAlignment);
    setCanvasProperties(AlbumConfig.defaultAlbumDescription);
    setSelectedFile(null);
    setFileDescription(null);
  };

  /**
   * saveDrawBoardAsJSON - call savePrintInformation service to save JSON file in server.
   */
  const saveDrawBoardAsJSON = async () => {
    if (canvasProperties) {
      const result = await savePrintInformation(canvasProperties);
      if (result.state === "SAVED") {
        resetAll();
      }
    }
  };

  /**
   * this set the download button href attribute with the latest edited image in canvas to download it locally.
   * @param {string} dataUrl - drawn image incanvas
   */
  const setImageSrcToDownload = (dataUrl: string) => {
    if (downloadRef && downloadRef.current) {
      downloadRef.current.setAttribute("href", dataUrl);
    }
  };

  /**
   * Image File Uploaded with image/* format and set it in component state for reference.
   * @param {File} file - Uploaded file
   */
  const handleUploadedFile = (file: File) => {
    if (file) {
      setSelectedFile(file);
    }
  };

  /**
   * Get the selected filter and set it in state.
   * @param {object} filters - { grayScale, blur, brightness, contrast }
   */
  const getAppliedFilters = (filters: PHOTO_FILTERS) => {
    setFilters(filters);
  };

  if (selectedFile) {
    fileNameForDownload = `${Date.now()}-${selectedFile.name}.jpg`;
  }

  const handleAlignment = (newTransform: ALIGNMENT) => {
    setAlignment(newTransform);
  };

  /**
   * It has the json response of a file chosen from the list of files in import section.
   * @param {ALBUM_DESCRIPTION} fileDescription - IMported file information
   */
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

  /**
   * Render the canvas board to show the image uploaded and edit.
   * @returns {JSX | null}
   */
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
            <h2>
              <span>Drawing Board</span>
            </h2>
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
