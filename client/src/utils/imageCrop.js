const createImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
    image.src = url;
  });
};

export const getCroppedImage = async (imgSrc, pixelCrop) => {
  const image = await createImage(imgSrc);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  const pixelRatio = window.devicePixelRatio;

  context.drawImage(
    image,
    pixelCrop.x * pixelRatio,
    pixelCrop.y * pixelRatio,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((imgBlob) => {
      const file = new File([imgBlob], "croppedAvatar.png", {
        type: "image/png",
      });
      const filePreview = window.URL.createObjectURL(imgBlob);
      resolve({ file, filePreview });
    }, "image/png");
  });
};
