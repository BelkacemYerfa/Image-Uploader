const express = require("express");
const router = express.Router();

router.route("/hello").get((req, res) => {
  console.log("Hello");
  res.end();
});

module.exports = router;
