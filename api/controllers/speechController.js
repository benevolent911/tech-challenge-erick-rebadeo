const Speech = require("../models/speechModel");
const asyncHandler = require("express-async-handler");

const getSpeeches = asyncHandler(async (req, res) => {
  try {
    const speeches = await Speech.find({});
    res.status(200).json(speeches);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getSpeech = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const speech = await Speech.findById(id);
    res.status(200).json(speech);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const createSpeech = asyncHandler(async (req, res) => {
  try {
    const speech = await Speech.create(req.body);
    res.status(200).json(speech);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const updateSpeech = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const speech = await Speech.findByIdAndUpdate(id, req.body);
    if (!speech) {
      res.status(404);
      throw new Error(`Cannot find speech with ID ${id}`);
    }
    const updatedSpeech = await Speech.findById(id);
    res.status(200).json(updatedSpeech);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const deleteSpeech = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const speech = await Speech.findOneAndDelete(id);
    if (!speech) {
      res.status(404);
      throw new Error(`Cannot find speech with ID ${id}`);
    }
    res.status(200).json(speech);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getSpeeches,
  getSpeech,
  createSpeech,
  updateSpeech,
  deleteSpeech,
};
