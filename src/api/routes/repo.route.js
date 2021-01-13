const {
  find
} = require("../controllers/repo.controller");

const router = require("express").Router();

router.route('/').get(find)

module.exports = router;
