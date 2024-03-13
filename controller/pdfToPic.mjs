import { fromPath } from "pdf2pic";

export function pdfToPic(path, fileName, userName) {
  const options = {
    density: 100,
    saveFilename: String(fileName),
    savePath: "./images/" + String(userName),
    format: "png",
    width: 600,
    height: 848,
  };

  const storeAsImage = fromPath(String(path), options);
  const pageToConvertAsImage = 1;

  storeAsImage(pageToConvertAsImage).then((resolve) => {
    console.log("Page 1 is now converted as image");

    console.log(resolve);
  });
}

export default pdfToPic;
