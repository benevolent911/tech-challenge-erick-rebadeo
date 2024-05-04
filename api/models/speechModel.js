const mongoose = require("mongoose");

const speechSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: [true, "Please enter author name"],
    },
    keywords: {
      type: Array,
      required: [true, "Please enter keywords"],
    },
    emailAddress: {
      type: Array,
      required: [true, "Please enter email"],
    },
    body: {
      type: String,
      required: [true, "Please enter text body"],
    },
    date: {
      type: String,
      required: [true, "Please enter date"],
    },
  },
  {
    timestamps: true,
  }
);

const Speech = mongoose.model("Speech", speechSchema);

module.exports = Speech;
