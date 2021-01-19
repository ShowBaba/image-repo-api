const {
  findAll
} = require("../controllers/repo.controller");

const router = require("express").Router();

router.route('/').get(findAll)

module.exports = router;
