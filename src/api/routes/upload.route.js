const upload = require("../../config/multer");
const { createImage, getUserImages, deleteOneImage } = require("../controllers/upload.controller");
const auth = require("../../middlewares/auth");

const router = require("express").Router();

router.route('/:id')
  .post(auth, upload.array("file"), createImage)
  .get(auth, getUserImages)
  .delete(auth, deleteOneImage)

module.exports = router;
