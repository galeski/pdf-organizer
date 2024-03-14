import http from "http";
import multer from "multer";
import express from "express";
import fs from "fs-extra";
import appRoutes from "./app.js";

const hostname = "localhost";
const port = 3000;

// MOCK PURPOSES
let currentUserId = 0;
let fileHashes = {};

let app = express();

app.use(express.json());
app.use("/", appRoutes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// TODO: move to new file

// module.exports = { app, server };
