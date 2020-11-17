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

router.get("/:id", validatePostId, (req, res) => {
  post
    .getById(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => console.log(err, "Post id not found"));
});

router.delete("/:id", validatePostId, (req, res) => {
  post
    .remove(req.params.id)
    .then(() => res.status(200).json({ message: "Post has been deleted" }));
});

router.put("/:id", validatePostId, (req, res) => {
  post
    .update(req.params.id, req.body)
    .then(() => {
      res.status(200).json({ updated_post: req.body.text });
    })
    .catch((err) => console.log("Cannot update post", err));
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  post.getById(id).then((post) => {
    if (!post) {
      res.status(400).json({ message: "invalid post id" });
    } else {
      next();
    }
  });
}

module.exports = router;
