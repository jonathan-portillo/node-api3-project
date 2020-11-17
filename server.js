const express = require("express");
const helmet = require("helmet");
const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter.js");

const server = express();

server.use(express.json());
server.use(helmet());
server.use("/user", userRouter);
server.use("/posts", postRouter);
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
//gonna get started
function logger(req, res, next) {
  console.log(
    `Request: ${req.method}`,
    `Request Url: ${req.url}`,
    `Timestamp: ${Date.now()}`
  );
  next();
}

module.exports = server;
