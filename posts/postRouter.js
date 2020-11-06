const express = require("express");
const userDb = require("../users/userDb");
const router = express.Router();
const post = require("./postDb.js");

router.get("/", (req, res) => {
  post
    .get()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log(err, "Error getting post");
    });
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
