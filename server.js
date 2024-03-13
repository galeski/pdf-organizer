import http from "http";
import multer from "multer";
import express from "express";
import fs from "fs-extra";

const hostname = "localhost";
const port = 3000;

import readPdf from "./controller/pdfController.mjs";
import pdfToPic from "./controller/pdfToPic.mjs";

// MOCK PURPOSES
let currentUserId = 0;
let fileHashes = {};

const debugMessage = (message) => {
  console.log(String(message));
};

const createFolder = (path) => {
  fs.mkdirsSync(path);
};

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      let userId = req.params.userId;
      let path = `./uploads/${userId}/`;
      fs.mkdirsSync(path);
      cb(null, path);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  }),
});

let app = express();

const server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// TODO: move to new file
app.post("/upload/:userId", (req, res) => {
  console.log(req.params);
  upload.single("file")(req, res, async function (err) {
    if (!err) {
      const uploadedFile = req.file;
      const fileHash = await readPdf(uploadedFile.path)[0];

      console.log(uploadedFile);

      if (!fileHashes[fileHash]) {
        fileHashes[fileHash] = true;
      } else {
        debugMessage("File hash already exists. Reuploading!");
      }

      createFolder("./images/" + req.params.userId);
      pdfToPic(uploadedFile.path, uploadedFile.filename, req.params.userId);

      res.statusCode = 200;
      res.end("File uploaded successfully!");
    } else {
      if (err) console.log(err);
      res.statusCode = 500;
      res.end("Error uploading file");
    }
  });
});

async function readFiles(path, arr) {
  fs.readdirSync(path).forEach((file) => {
    arr.push(file);
  });

  return arr;
}

app.get("/uploads/:userId", async (req, res) => {
  const uploadFolder = "./uploads/" + req.params.userId;

  let userFiles = await readFiles(uploadFolder, []);

  console.log(userFiles);

  res.statusCode = 200;
  res.send(userFiles);
});

// module.exports = { app, server };
