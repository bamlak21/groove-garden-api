const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Song = require("./models/song");
const cors = require("cors");

app.use(cors());

app.use(express.json());
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("db live!"))
  .catch((err) => console.log(err));

app.get("/", async (req, res) => {
  const songs = await Song.find();

  try {
    res.status(200).send(songs);
  } catch (err) {
    res.status(500);
    console.log(err);
  }
});

// post Request
app.post("/", async (req, res) => {
  const newSong = new Song(req.body);

  try {
    const savedSong = await newSong.save();

    res.status(200).json(savedSong);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.status(200).json("Song has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put("/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedSong);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(5000, () => console.log("Server is live! on port 4000"));
