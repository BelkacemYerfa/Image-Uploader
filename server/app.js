const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/main");
const multer = require("multer");
const ImageSchema = require("./models/ImageUploadedSchema");
const { readFileSync } = require("fs");

/* const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
This code for the local storage of the image file is not needed because the image is stored in the database.
 */

const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.post("/api/v1/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const img_Path_Encoded = readFileSync(req.file.path);
  const image = await ImageSchema.create({
    img: {
      data: Buffer.from(img_Path_Encoded, "base64"),
      contentType: req.file.mimetype,
    },
  });
  const img_Path_Decoded = image.img.data.toString("base64");
  res.json({
    success: true,
    message: "File uploaded successfully",
    file: {
      img: img_Path_Decoded,
      contentType: image.img.contentType,
    },
  });
});

const Port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(Port, () => {
      console.log(`Server is running on port ${Port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
