const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const blogsSchema = new mongoose.Schema(
  {
    authorId: { type: ObjectId, required: true, ref: "Author", trim: true },
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    imgUrl: { type: String, required: true, trim: true },
    deletedAt: { type: Boolean, default: false, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blogs", blogsSchema);
