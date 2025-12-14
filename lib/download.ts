
export const getSvgString = (svgElement: SVGSVGElement, size: number = 1024): string => {
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svgElement);

  // Add namespaces if missing
  if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if (!source.match(/^<svg[^>]+xmlns:xlink="http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }

  // Add width and height attributes for export size
  // If they exist, replace them; otherwise insert them
  if (source.match(/^<svg[^>]+width="/)) {
      source = source.replace(/width="[^"]*"/, `width="${size}"`);
  } else {
      source = source.replace(/^<svg/, `<svg width="${size}"`);
  }
  
  if (source.match(/^<svg[^>]+height="/)) {
      source = source.replace(/height="[^"]*"/, `height="${size}"`);
  } else {
      source = source.replace(/^<svg/, `<svg height="${size}"`);
  }

  return source;
};

export const svgStringToPngBlob = (svgString: string, size: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Could not get canvas context"));
      return;
    }

    canvas.width = size;
    canvas.height = size;

    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url);
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Could not create PNG blob"));
        }
      }, "image/png");
    };

    img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Failed to load SVG image"));
    };

    img.src = url;
  });
};

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const copyTextToClipboard = async (text: string) => {
    if (!navigator.clipboard) {
        throw new Error("Clipboard API not available");
    }
    await navigator.clipboard.writeText(text);
};

// Legacy wrappers for backward compatibility (and ease of use)
export const downloadSvg = (svgElement: SVGSVGElement, filename: string, size: number = 1024) => {
    const source = getSvgString(svgElement, size);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    downloadBlob(blob, `${filename}.svg`);
};

export const downloadPng = async (svgElement: SVGSVGElement, filename: string, size: number = 1024) => {
    const source = getSvgString(svgElement, size);
    const blob = await svgStringToPngBlob(source, size);
    downloadBlob(blob, `${filename}.png`);
};

export const copyPngToClipboard = async (svgElement: SVGSVGElement, size: number) => {
    const source = getSvgString(svgElement, size);
    const blob = await svgStringToPngBlob(source, size);
    
    if (!navigator.clipboard || !navigator.clipboard.write) {
        throw new Error("Clipboard write API not available");
    }
    
    try {
        await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob })
        ]);
    } catch (error) {
         console.error("Failed to copy PNG:", error);
         throw new Error("Failed to copy PNG to clipboard");
    }
};
