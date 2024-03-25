import multer from "multer";
import express from "express";
import fs from "fs-extra";
import readPdf from "./controller/pdfController.mjs";
import pdfToPic from "./controller/pdfToPic.mjs";
import printFileInfoHtml from "./templates/fileInfo.mjs";
import bodyParser from "body-parser";

const router = express.Router();
const debug = true;

router.use(bodyParser.json());

// MOCK PURPOSES
let currentUserId = 0;
let fileHashes = {};

const debugMessage = (message) => {
  if (debug) console.log(String(message));
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

router.post("/upload/:userId", (req, res) => {
  debugMessage(req.params);
  upload.single("file")(req, res, async function (err) {
    if (!err) {
      const uploadedFile = req.file;
      const fileHash = await readPdf(uploadedFile.path)[0];

      debugMessage(uploadedFile);

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
      if (err) debugMessage(err);
      res.statusCode = 500;
      res.end("Error uploading file");
    }
  });
});

async function readFiles(path, files) {
  try {
    fs.readdirSync(path).forEach((file) => {
      files.push(file);
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("Directory does not exist:", path);
    } else {
      console.error("An error occurred:", error);
    }
  }

  if (!files.length) {
    files = "No user files";
  }

  return files;
}

router.get("/uploads/:userId", async (req, res) => {
  const uploadFolder = "./uploads/" + req.params.userId;

  let userFiles = await readFiles(uploadFolder, []);

  debugMessage(userFiles);

  res.statusCode = 200;
  res.send({ userFiles });
});

router.get("/info/:fileInfo", (req, res) => {
  console.log("working");
  const fileName = req.params.fileInfo;

  res.statusCode = 200;
  res.set("Content-Type", "text/html");
  res.send(printFileInfoHtml(fileName));
});

export default router;
