import http from "http";
import multer from "multer";
import express from "express";
import fs from "fs-extra";

const hostname = "localhost";
const port = 3000;

import readPdf from "./controller/pdfController.mjs";

// MOCK PURPOSES
let currentUserId = 0;
let fileHashes = {};

const debugMessage = (message) => {
  console.log(String(message));
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
      console.log(uploadedFile);
      const fileHash = await readPdf(uploadedFile.path)[0];

      if (!fileHashes[fileHash]) {
        fileHashes[fileHash] = true;
      } else {
        debugMessage("File hash already exists. Reuploading!");
      }

      res.statusCode = 200;
      res.end("File uploaded successfully!");
    } else {
      if (err) console.log(err);
      res.statusCode = 500;
      res.end("Error uploading file");
    }
  });
});

// module.exports = { app, server };
