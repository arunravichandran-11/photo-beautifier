export interface PHOTO_FILTERS {
  grayScale: string;
  blur: string;
  brightness: string;
  contrast: string;
}

export interface ALIGNMENT {
  scale: number;
  horizontal: number;
  vertical: number;
}

export interface ALBUM_DESCRIPTION {
  id: string;
  printArea: {
    width: number;
    height: number;
  };
  photo: {
    name: string;
    width: number;
    height: number;
    src: string;
    x: number;
    y: number;
  };
}
