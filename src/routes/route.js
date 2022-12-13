const express = require("express");
const router = express.Router();

const authorController = require("../controllers/authorController");
const blogscontroller = require("../controllers/blogsController");

router.post("/register", authorController.createAuthor);

router.post("/login", authorController.loginUser);

router.post("/create", blogscontroller.createBlogs);

router.delete("/delete/:blogId", blogscontroller.deleteBlogs);

router.put("/update/:blogId", blogscontroller.updateBlogs);

router.get("/blogs/:authorId", blogscontroller.getBlogs);

router.get("/update/:blogId", blogscontroller.getParticularBlog);

router.get("/allBlogs", blogscontroller.getAllBlogs);

router.get("/profile/:authorId", authorController.authorDetails);

module.exports = router;
