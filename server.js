import express from "express";
import appRoutes from "./app.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const hostname = "localhost";
const port = 3000;

// __dirname can't be used in modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/", appRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.use(express.static(path.join(__dirname, "frontend")));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// module.exports = { app, server };
