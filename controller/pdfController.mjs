import { PdfReader } from "pdfreader";
import crypto from "crypto";

async function parsePdf(file) {
  const items = [];
  let idx = 0;

  return new Promise((resolve, reject) => {
    new PdfReader().parseFileItems(String(file), (err, item) => {
      if (err) {
        reject(err);
      } else if (!item) {
        resolve(items);
      } else if (item.text) {
        idx++;
        items.push(item.text);
      }
    });
  });
}

export async function readPdf(file) {
  const items = await parsePdf(file);

  let hash = crypto.createHash("md5").update(items.join("")).digest("hex");

  // kinda ugly
  return [hash, items];
}

export default readPdf;
