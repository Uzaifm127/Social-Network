import { ChangeEvent } from "react";

export type OnChangeType<T> = (e: ChangeEvent<T>) => void;

// Following types are used in imageCrop.ts
export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type CreateImageTypes = (url: string) => Promise<HTMLImageElement>;

export type GetCroppedImageTypes = (
  imgSrc: string,
  pixelCrop: CropArea
) => Promise<{ file: File; filePreview: string }>;
