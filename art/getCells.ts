export async function getCells(imgSrc: string, width = 1920) {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.width = width;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      resolve(img);
    };
    img.onerror = reject;
    img.src = imgSrc;
  });

  const canvas = document.createElement('canvas');

  const ctx = canvas.getContext('2d');

  const scaledWidth = img.width / 20;
  const scaledHeight = img.height / 20;

  canvas.width = scaledWidth;
  canvas.height = scaledHeight;
  ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

  const data = ctx.getImageData(0, 0, scaledWidth, scaledHeight);

  console.log(data);

  return data;
}
