import express from "express";
import appRoutes from "./app.js";
import cors from "cors";

const hostname = "localhost";
const port = 3000;

let app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/", appRoutes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// module.exports = { app, server };
