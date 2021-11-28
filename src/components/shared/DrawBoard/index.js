import React, { useEffect } from "react";
import {
  drawImageFileIntoCanvas,
  drawImageIntoCanvas,
  convertCanvasToDataUrl,
} from "../../../utils/drawingBoard";

const BOARD_WIDTH = 960;
const BOARD_HEIGHT = 480;

const DrawBoard = (props) => {
  const {
    file,
    photoDescription,
    filters,
    alignment,
    getCanvasImageUrl,
    getCanvasProperties,
  } = props;
  const drawingBoardRef = React.useRef();

  const printSurfaceProperties = {
    id: "draw-board",
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
  };

  const processCanvasImage = () => {
    if (drawingBoardRef && drawingBoardRef.current) {
      const dataUrl = convertCanvasToDataUrl(drawingBoardRef.current);
      if (getCanvasImageUrl) {
        getCanvasImageUrl(dataUrl);
      }
    }
  };

  useEffect(() => {
    if (file) {
      drawImageFileIntoCanvas(
        file,
        drawingBoardRef.current,
        {
          filter: filters,
          size: alignment,
        },
        (data) => {
          console.log("data - upload", data);
          if (drawingBoardRef && drawingBoardRef.current) {
            const photoUrl = convertCanvasToDataUrl(drawingBoardRef.current);
            if (data && getCanvasProperties) {
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
        (data) => {
          console.log("data", data);
          if (data && getCanvasProperties) {
            getCanvasProperties(data);
          }
        }
      );
    }
  }, [photoDescription, filters, alignment]);

  return <canvas {...printSurfaceProperties} ref={drawingBoardRef}></canvas>;
};

export default DrawBoard;
