import { PdfReader } from "pdfreader";

function splitText(text) {
  const regex = /[\r\n]/g;
  const newString = text.replace(regex, "").slice(0, 5);

  console.log(newString);

  return newString;
}

export function readPdf(file) {
  const pdfReader = new PdfReader();

  let items = [];
  let text = "";
  let idx = 0;

  pdfReader.parseFileItems(String(file), (error, item) => {
    if (error) console.error("error:", error);
    else if (!item) console.warn("end of file");
    else if (item.text) {
      let currText = String(item.text);
      console.log(idx, item.text);
      idx++;
      items.push(item);
    }
  });

  for (let item of items) {
    console.log(item.text);
  }
}

export default readPdf;
