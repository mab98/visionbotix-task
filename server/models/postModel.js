import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30 
  },
  subtitle: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40
  },
  content: {
    type: String,
    required: true,
    minlength: 50,
    maxlength: 1000
  },
  url : {
    type: String,
    default:"no image"
  }
});

export default mongoose.model('Post', postSchema);;