const express = require("express");
const router = express.Router();
const user = require("./userDb");
const posts = require("../posts/postDb");

router.post("/", validateUser, (req, res) => {
  user
    .insert(req.body)
    .then(res.status(200).json(req.body))
    .catch((err) => {
      console.log("Error adding user", err);
    });
});

router.post("/:id/posts", validatePost, validateUserId, (req, res) => {
  const post = req.body;
  posts
    .insert({ ...post, user_id: req.params.id })
    .then((post) => res.status(201).json(post))
    .catch((err) => {
      console.log("Error creating post", err);
    });
});

router.get("/", (req, res) => {
  user.get().then((user) => {
    res.status(200).json(user);
  });
});

router.get("/:id", validateUserId, (req, res) => {
  user
    .getById(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => console.log(err, "User id not found"));
});

router.get("/:id/posts", validateUserId, (req, res) => {
  user
    .getUserPosts(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((err) => {
      console.log("Error finding posts", err);
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  user
    .remove(req.params.id)
    .then(() =>
      res.status(200).json({ message: `User has been has been deleted` })
    )
    .catch((err) => console.log("Error deleting post", err));
});

router.put("/:id", validateUserId, validatePost, (req, res) => {
  user
    .update(req.params.id, req.body)
    .then(() => {
      res.status(200).json({ new_username: req.body.name });
    })
    .catch((err) => console.log("Error deleting post", err));
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  user.getById(id).then((user) => {
    if (!user) {
      res.status(400).json({ message: "invalid user id" });
    } else {
      next();
    }
  });
}

function validateUser(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "Missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body.text) {
    res.status(400).json({ message: "Missing post data" });
  } else {
    next();
  }
}

module.exports = router;
