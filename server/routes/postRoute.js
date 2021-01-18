import express from "express";
import mongoose from "mongoose";

const router = express.Router();
const Post = mongoose.model("Post");

// GET ALL BLOGS
router.get('/blogs', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ posts });
  } catch (error) {
    res.json({ message: err })
  }
});

// GET A BLOG BY TITLE
router.get('/blog/:title', async (req, res) => {
  try {
    const post = await Post.findOne({ title: req.params.title });
    res.json({ post });
    // res.json(post);
  } catch (error) {
    res.json({ message: err })
  }
});

// GET A BLOG BY ID
router.get('/blog/id/:id', async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.json({ post });
    // res.json(post);
  } catch (error) {
    res.json({ message: err })
  }
});

// GET A BLOG BY SUBTITLE
router.get('/blog/subtitle/:subtitle', async (req, res) => {
  try {
    const post = await Post.findOne({ subtitle: req.params.subtitle });
    res.json({ post });
    // res.json(post);
  } catch (error) {
    res.json({ message: err })
  }
});

// CREATE BLOG
router.post('/blogs/create', (req, res) => {
  const { title, subtitle, content, url } = req.body;
  if (!title || !subtitle || !content) {
    return res.status(422).json({ error: "Please enter all fields" });
  }
  // res.json({ message: "successfully added" });
  Post.findOne({ title: title })
    .then((savedPost) => {
      if (savedPost) {
        return res.status(422).json({ error: "Post with Same Title already exists" });
      }
      const post = new Post({
        title,
        subtitle,
        content,
        url
      })
      post.save()
        .then(result => {
          res.json({ message: "Post Saved Successfully !" })
          res.json({ post: result })
        })
        .catch(error => {
          console.log(error);
        })
    })
    .catch(error => {
      console.log(error);
    })
})

// DELETE BLOG BY TITLE
router.delete('/delete/:title', async (req, res) => {
  try {
    const removedPost = await Post.deleteOne({ title: req.params.title });
    res.json({ message: "Post Deleted Successfully !" });
  } catch (error) {
    res.json({ message: error });
  }
})

// DELETE ALL BLOGS
router.delete('/deleteall', async (req, res) => {
  try {
    const removedPost = await Post.deleteMany();
    res.json({ message: "successfully deleted" });
  } catch (error) {
    res.json({ message: error });
  }
})

// UPDATE BLOG BY TITLE
router.patch('/update/:title', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { title: req.params.title },
      { $set: { subtitle: req.body.subtitle, content: req.body.content, url: req.body.url } }
    );
    console.log(req.body);
    res.json(updatedPost);
  } catch (error) {
    res.json({ message: error });
  }
})

export default router;