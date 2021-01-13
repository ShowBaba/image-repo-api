const {
  findByName
} = require("../controllers/repo.controller");
const auth = require("../../middlewares/auth");

const router = require("express").Router();

router.route('/').get(findByName)

module.exports = router;
