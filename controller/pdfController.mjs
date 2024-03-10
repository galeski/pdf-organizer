import { PdfReader } from "pdfreader";

export function readPdf(file) {
  const pdfReader = new PdfReader();

  pdfReader.parseFileItems(String(file), (error, item) => {
    if (error) console.error("error:", error);
    else if (!item) console.warn("end of file");
    else if (item.text) console.log(item.text);
  });
}

export default readPdf;
