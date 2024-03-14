import mongoose from "mongoose";

/**
 * User schema
 */
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  api_key: { type: String },
});

export default mongoose.model("user", userSchema);
