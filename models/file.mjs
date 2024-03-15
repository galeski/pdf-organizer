import mongoose from "mongoose";

/**
 * File schema
 */
const fileSchema = new mongoose.Schema({
  userid: { type: Number, required: true },
  filename: { type: String, required: true },
  filenameWithoutExt: { type: String },
  firstPageDescription: { type: String },
});

export default mongoose.model("file", fileSchema);
