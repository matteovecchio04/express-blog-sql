const express = require("express")
const postsController = require("../controllers/postController")

const router = express.Router()

router.get("/", postsController.index)

router.get("/:id", postsController.show)

router.get("/:id", postsController.destroy)

module.exports = router