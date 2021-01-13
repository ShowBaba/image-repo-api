const multer = require("multer");
const path = require("path");

// TODO: specify max size for uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, path.join(__dirname, "../public/images"));
    } else {
      cb({ message: "Not an image file" }, false);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 } });
module.exports = upload;
