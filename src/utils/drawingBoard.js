const BOARD_WIDTH = 960;
const BOARD_HEIGHT = 480;

const defaultImageFilters = {
  grayScale: "0",
  blur: "0",
  brightness: "100",
  contrast: "100",
};

const defaultImageDimension = {
  x: 0,
  y: 0,
  width: null,
  height: null,
};

/**
 * Converts the filter object into css filter property.
 * @param {object} filters - grayScale, blur, brightness, contrast - filters applied.
 * @returns {string} filterToApply - CSS supported filter string.
 */
const getImageFilterCss = (filters) => {
  const { grayScale, blur, brightness, contrast } = filters;

  const grayScaleValue = grayScale ? `${grayScale}%` : "0%";
  const blurValue = blur ? `${blur}px` : "0px";
  const brightnessValue = brightness ? `${brightness}%` : "100%";
  const contrastValue = contrast ? `${contrast}%` : "100%";

  const filterToApply = `grayScale(${grayScaleValue}) blur(${blurValue}) brightness(${brightnessValue}) contrast(${contrastValue})`;

  return filterToApply;
};

/**
 * Receives the canvas and fit the canvas based on BOARD_WIDTH, BOARD_HEIGHT and return context object.
 * @param {HTMLCanvasElement} canvas
 * @returns {CanvasRenderingContext2D}
 */
const getClearCanvasContext = (canvas) => {
  const canvasWidth = BOARD_WIDTH;
  const canvasHeight = BOARD_HEIGHT;
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  canvas.style.boxSizing = "border-box";

  const scale = window.devicePixelRatio;
  canvas.width = Math.floor(canvasWidth * scale);
  canvas.height = Math.floor(canvasHeight * scale);

  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  return ctx;
};

/**
 * Draws the image into the canvas and position it according the configurations given.
 * @param {HTMLImageElement} img - Image to be drawn in canvas
 * @param {HTMLCanvasElement} canvas - the actual canvas element
 * @param {object} - file, size(alignment), imageDimension
 * @returns {object} - canvas properties after drawn.
 */
const drawImage = (
  img,
  canvas,
  {
    filter = defaultImageFilters,
    size = null,
    imageDimension = defaultImageDimension,
  }
) => {
  const ctx = getClearCanvasContext(canvas);

  if (img.naturalWidth > canvas.width) {
    img.width = canvas.width;
  }

  if (img.naturalHeight > canvas.height) {
    img.height = canvas.height;
  }

  if (!imageDimension.width) {
    imageDimension.width = canvas.width;
  }
  if (!imageDimension.height) {
    imageDimension.height = canvas.height;
  }

  if (filter) {
    ctx.filter = getImageFilterCss(filter);
  }

  let centerX, centerY;
  let drawWidth, drawHeight;

  if (img.naturalWidth < canvas.width) {
    drawWidth = img.naturalWidth;
    centerX = canvas.width / 2 - img.naturalWidth / 2;
  } else {
    drawWidth = canvas.width;
    centerX = 0;
  }

  if (img.naturalHeight < canvas.height) {
    drawHeight = img.naturalHeight;
    centerY = canvas.height / 2 - img.naturalHeight / 2;
  } else {
    drawHeight = canvas.height;
    centerY = 0;
  }

  if (size && size.scale) {
    const increasedWidth = drawWidth * (size.scale / 100);
    const increasedHeight = drawHeight * (size.scale / 100);
    drawWidth = drawWidth + increasedWidth;
    drawHeight = drawHeight + increasedHeight;

    centerX = canvas.width / 2 - drawWidth / 2;
    centerY = canvas.height / 2 - drawHeight / 2;
  }

  if (size.horizontal) {
    const moveLeft = centerX * (size.horizontal / 100);
    centerX = centerX + moveLeft;
  }

  if (size.vertical) {
    const moveTop = centerY * (size.vertical / 100);
    centerY = centerY + moveTop;
  }

  ctx.drawImage(img, centerX, centerY, drawWidth, drawHeight);

  const drawnImageProperties = {
    x: centerX,
    y: centerY,
    width: drawWidth,
    height: drawHeight,
    filter,
  };

  return drawnImageProperties;
};

/**
 * Function to read the image/* files to get the image src.
 * @param {File} file - Imported Image File
 * @param {HTMLCanvasElement | null} canvas
 * @param {object} options - Filters, alignment
 * @param {Function} callback
 */
const drawImageFileIntoCanvas = (file, canvas, options, callback) => {
  const canvasProperties = {
    id: file.name,
    printArea: {
      width: canvas.width,
      height: canvas.height,
    },
    photo: {
      name: file.name,
    },
  };

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.src = reader.result;
    img.onload = () => {
      const drawnImageProperties = drawImage(img, canvas, options);
      canvasProperties.photo = {
        ...canvasProperties.photo,
        ...drawnImageProperties,
      };

      if (callback) {
        callback(canvasProperties);
      }
    };
  };

  reader.readAsDataURL(file);
};

/**
 * It receives the image dataUrl and draw it in canvas.
 * @param {string} dataUrl
 * @param {HTMLCanvasElement | null} canvas
 * @param {object} options - Filters, alignment
 * @param {Function} callback
 */
const drawImageIntoCanvas = (dataUrl, canvas, options, callback) => {
  const img = new Image();
  img.src = dataUrl;
  img.onload = () => {
    const drawnImageProperties = drawImage(img, canvas, options);
    callback(drawnImageProperties);
  };
};

/**
 * convert the given canvas to image[data url].
 * @param {HTMLCanvasElement | null} canvas
 * @returns {dataUrl} imageUrl
 */
const convertCanvasToDataUrl = (canvas) => {
  const imageUrl = canvas.toDataURL("image/jpeg", 1.0);
  imageUrl.replace("image/jpeg", "image/octet-stream");
  return imageUrl;
};

export { drawImageFileIntoCanvas, drawImageIntoCanvas, convertCanvasToDataUrl };
