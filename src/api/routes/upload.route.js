const upload = require("../../config/multer");
const {
  uploadImage,
  getUserImages,
  deleteOneImage,
} = require("../controllers/upload.controller");
const auth = require("../../middlewares/auth");

const router = require("express").Router();

router
  .route("/")
  .post(auth, upload.array("file"), uploadImage)
  .get(auth, getUserImages);
router.route("/:id").delete(auth, deleteOneImage);

module.exports = router;
