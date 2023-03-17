const ImageSchema = require("../models/ImageUploadedSchema");
const { readFileSync } = require("fs");
const { join } = require("path");

const UploadImage = async (req, res) => {
  try {
    const { file } = req.body;
    const image = await ImageSchema.create({
      img: {
        data: readFileSync(join(__dirname + "/uploads/" + file.name)),
        contentType: file.type,
      },
    });
    console.log(file);
    res
      .status(200)
      .json({ message: "Image Uploaded Successfully", data: image });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  UploadImage,
};
