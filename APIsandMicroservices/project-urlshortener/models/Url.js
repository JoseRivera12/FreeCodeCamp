const { Schema, model } = require("mongoose");

const urlSchema = new Schema({
  original_url: { type: String, required: true },
  short_url: { type: String, required: true },
});

module.exports = model("Url", urlSchema);