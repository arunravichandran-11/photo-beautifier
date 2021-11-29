import React, { useRef, useEffect } from "react";
import {
  PHOTO_FILTERS,
  ALIGNMENT,
  ALBUM_DESCRIPTION,
} from "../../../constants/types";

import {
  drawImageFileIntoCanvas,
  drawImageIntoCanvas,
  convertCanvasToDataUrl,
} from "../../../utils/drawingBoard";

const BOARD_WIDTH = 960;
const BOARD_HEIGHT = 480;

interface DrawBoardProps {
  file?: File | null;
  photoDescription?: ALBUM_DESCRIPTION | null;
  filters: PHOTO_FILTERS;
  alignment: ALIGNMENT;
  getCanvasImageUrl: (e: string) => void;
  getCanvasProperties: (e: ALBUM_DESCRIPTION) => void;
}

const DrawBoard = (props: DrawBoardProps) => {
  const {
    file,
    photoDescription,
    filters,
    alignment,
    getCanvasImageUrl,
    getCanvasProperties,
  }: DrawBoardProps = props;
  const drawingBoardRef = useRef<HTMLCanvasElement | null>(null);

  const printSurfaceProperties = {
    id: "draw-board",
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
  };

  /**
   * Draw the images to canvas with the help of drawingBoard utils service
   */
  const processCanvasImage = () => {
    if (drawingBoardRef && drawingBoardRef.current) {
      const dataUrl = convertCanvasToDataUrl(drawingBoardRef.current);
      if (getCanvasImageUrl) {
        getCanvasImageUrl(dataUrl);
      }
    }
  };

  /**
   * Draw the images to canvas with the help of drawingBoard utils service on editing.
   */
  useEffect(() => {
    if (file) {
      drawImageFileIntoCanvas(
        file,
        drawingBoardRef.current,
        {
          filter: filters,
          size: alignment,
        },
        (data: ALBUM_DESCRIPTION) => {
          if (drawingBoardRef && drawingBoardRef.current) {
            const photoUrl = convertCanvasToDataUrl(drawingBoardRef.current);
            if (data) {
              data.photo.src = photoUrl;
              getCanvasProperties(data);
            }
          }
        }
      );

      setTimeout(processCanvasImage, 1000);
    }
  }, [file, filters, alignment]);

  useEffect(() => {
    console.log("phot", photoDescription);
    if (
      photoDescription &&
      photoDescription.photo &&
      photoDescription.photo.src
    ) {
      drawImageIntoCanvas(
        photoDescription.photo.src,
        drawingBoardRef.current,
        {
          filter: filters,
          size: alignment,
        },
        (data: ALBUM_DESCRIPTION) => {
          if (data) {
            getCanvasProperties(data);
          }
        }
      );
    }
  }, [photoDescription, filters, alignment]);

  return <canvas {...printSurfaceProperties} ref={drawingBoardRef}></canvas>;
};

export default DrawBoard;
