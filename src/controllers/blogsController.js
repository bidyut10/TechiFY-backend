const blogsModel = require("../models/blogsModel");
const authorModel = require("../models/authorModel");
const url = require('url');

const createBlogs = async function (req, res) {
  try {
    //edge Cases for createblogs according to Blog model and as per our requirements
    //if body is empty
    let data = req.body;
    const {authorId, title, location , imgUrl, description}= data
    if (Object.keys(data).length == 0) {
      return res.status(400).send({
        status: false,
        msg: "Please provide your Blog details in body",
      });
    }

    //checking required feilds
    if (!(authorId) && !(title) && !(location) && !(imgUrl) && !(description)) {
      return res
        .status(400)
        .send({ status: false, msg: "Missing feild" });
    }
    
    //empty space
    if (title.trim().length === 0 && location.trim().length === 0 && imgUrl.trim().length === 0 && description.trim().length === 0) {
      res.status(400).send("Missing Field")
    }

    //imgUrl
    if(data.imgUrl){
      const reg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
      if (!reg.test(imgUrl)) {
        return res.status(400).send({ status: false, msg: "imgUrl is not in correct format" })
      };
    }
    

    //authorid is exist or not
    let checkauthorId = await authorModel.findById({ _id: authorId });
    if (!checkauthorId) {
      return res
        .status(400)
        .send({ status: false, msg: "AthorId does'nt exist" });
    }
    

    //After the passing all the edge cases now author can created his own new blogs

    let blogCreated = await blogsModel.create(data);
    {
      return res.status(201).send({ data: blogCreated });
    }
  } catch (err) {
     res.status(500).send({ msg: "Error", error: err.message });
  }
};

const getBlogs = async function (req, res) {
  try {
    let authorId1 = req.params.authorId;

    if (!/^[0-9a-fA-F]{24}$/.test(authorId1)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid Authorid" });
    }

    let authorIdCheck = await authorModel.findById({ _id: authorId1 });

    if (!authorIdCheck) {
      return res
        .status(404)
        .send({ status: false, msg: "AuthorId is not exist" });
    }

    let blogs = await blogsModel.find({
      authorId: authorIdCheck,
      deletedAt: false,
    });

    if (blogs.length == 0) {
      return res.status(404).send({
        status: false,
        msg: "No such Blogs are found for this authorId",
      });
    } else {
      return res.status(200).json({ blogs });
    }
  } catch (err) {
     res.status(500).send({ msg: "Error", error: err.message });
  }
};
const getAllBlogs = async function (req, res) {
  try {

    let blogs = await blogsModel.find({
      deletedAt: false,
    });

    if (blogs.length == 0) {
      return res.status(404).send({
        status: false,
        msg: "No such Blogs are found",
      });

    } else {
      return res.status(200).json({ blogs });
    }
  } catch (err) {
     res.status(500).send({ msg: "Error", error: err.message });
  }
};

const deleteBlogs = async function (req, res) {
  try {
    let blogId = req.params.blogId;

    if (!/^[0-9a-fA-F]{24}$/.test(blogId)) {
      return res
        .status(400)
        .send({ status: false, message: "BlogId format isn't correct" });
    }

    let deleteBlog = await blogsModel.findByIdAndUpdate(
      { _id: blogId },
      { $set: { deletedAt: true } },
      { new: true }
    );

    if (deleteBlog.length == 0) {
      return res.status(404).send({
        status: false,
        msg: "No Blogs",
      });
    }

    return res.status(200).json({ msg: "Deleted!" });

  } catch (err) {
     res.status(500).send({ msg: "Error", error: err.message });
  }
};

const getParticularBlog = async (req, res)=>{

  try {
    let blogId = req.params.blogId;

    if (!/^[0-9a-fA-F]{24}$/.test(blogId)) {
      return res
        .status(400)
        .send({ status: false, message: "BlogId format isn't correct" });
    }

    let blogs = await blogsModel.findById({ _id: blogId });

    if (blogs.length == 0) {
      return res.status(404).send({
        status: false,
        msg: "No Blogs",
      });
    }

    return res.status(200).json({ blogs });

  } catch (err) {
     res.status(500).send({ msg: "Error", error: err.message });
  }
}

const updateBlogs = async function (req, res) {
  try {
    let id = req.params.blogId;
    
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        status: false,
        msg: "Provide your Blog details",
      });
    }

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res
        .status(400)
        .send({ status: false, message: "BlogId format isn't correct" });
    }

    const { title, location, description, imgUrl } = req.body;

    //checking required feilds,, empty space
    if (req.body.title){
      if (title.trim().length === 0) {
        return res
          .status(400)
          .send({ status: false, msg: "Missing feild" });
      }
    }
    console.log(title.trim());
    if (req.body.description) {
      if (description.trim().length === 0) {
        return res
          .status(400)
          .send({ status: false, msg: "Missing feild" });
      }
    }
    if (req.body.location) {
      if (location.trim().length === 0) {
        return res
          .status(400)
          .send({ status: false, msg: "Missing feild" });
      }
    }
    if (req.body.imgUrl) {
      const reg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
      if (!reg.test(imgUrl)) {
        return res.status(400).send({ status: false, msg: "imgUrl is not in correct format" })
      };
    }
    
    let updateBlog = await blogsModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: title,
          location: location,
          description: description,
          imgUrl: imgUrl,
        },
      },
      { new: true }
    );

    return res.status(200).json({ msg: "Update complete!" });
  } catch (err) {
     res.status(500).send({ msg: "Error", error: err.message });
  }
};

module.exports={ createBlogs, deleteBlogs, getBlogs, getAllBlogs, updateBlogs, getParticularBlog}
